// var http = require('http')
require('dotenv').config({path: '.env.development'})
var RackSessionParser = require('./ws/rack_session_parser')
let ChannelSubscriber = require('./ws/channel_subscriber')
let PgClient = require('./ws/pg_client')

var Server = require('socket.io')
var io = new Server(3000)

// initialize pg client
let pgClient = PgClient.create(process.env.DATABASE_URL)

// initialize websocket io
io.on('connection', function (socket) {
  console.log(`a user connected: ${socket.id}`)

  let cookieString = socket.handshake.headers['cookie']
  let secret = process.env.WEB_SESSIONS_SECRET
  let parser = RackSessionParser.create(cookieString, secret)
  parser.parse(function (err, rackSessionObj) {
    if (err) {
      console.log(err)
      socket.disconnect()
    } else {
      let roomNum = rackSessionObj['warden.user.default.key']
      socket.roomNum = roomNum

      console.log(`A user id: ${socket.id} is joining room: ${roomNum}`)
      socket.join(roomNum)
    }
  })

  socket.on('disconnect', function () {
    console.log(`A user ${socket.id} has disconnected`)
    console.log('----------')
  })

  console.log(socket.handleClientQueueEvent)
  /*
  Handle client event
  Inputs
  - event_name
  - columnName
  */
  socket.handleClientQueueEvent = function (eventName, columnName) {
    this.on(eventName, function (msg) {
      if (this.roomNum) {
        let sql = `UPDATE users SET ${columnName} = ${columnName} + 1 WHERE id = ${this.roomNum}`
        console.log(sql)
        pgClient.query(sql, function (err, result) {
          if (err) {
            console.log(err)
          }
        })
      }
    })
  }

  socket.handleClientQueueEvent('request ticket', 'ticket_number')
  socket.handleClientQueueEvent('next queue', 'queue_number')
})
/*
Subscribe to a channel
Inputs
- channel_name
- data_key
- emit_event_name
*/
function subscribe (channelName, dataKey, emitEvent) {
  let subscriber = ChannelSubscriber.create(process.env.DATABASE_URL, channelName)
  subscriber.connect(function (err) {
    if (err) {
      console.log(err)
    } else {
      console.log(`Subscribed to channel '${channelName}' for data key '${dataKey}' to emit event '${channelName}'`)
      subscriber.listen(function (msg) {
        let payload = JSON.parse(msg['payload'])
        console.log(payload)
        let roomNum = payload.user_id
        let data = payload[dataKey]
        if (roomNum) {
          console.log(`Emitting ${data} to room ${roomNum}`)
          io.to(roomNum).emit(emitEvent, data)
        }
      })
    }
  })
}

subscribe('ezq_queue_number', 'queue_number', 'queue update')
subscribe('ezq_ticket_number', 'ticket_number', 'ticket update')

console.log('listening on *:3000')
