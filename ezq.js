// var http = require('http')
require('dotenv').config()
var RackSessionParser = require('./ws/rack_session_parser')

let ChannelSubscriber = require('./ws/channel_subscriber')
let SubscribeMessageParser = require('./ws/subscribe_message_parser')

let PgClient = require('./ws/pg_client')

var Server = require('socket.io')
var io = new Server(3000)

// initialize pg client
let pgClient = PgClient.create(process.env.DATABASE_URL)

// initialize websocket io
io.on('connection', function (socket) {
  console.log(`a user connected: '${socket.id}' with type: '${socket.handshake.query.client_type}'`)
  socket.clientType = socket.handshake.query.client_type

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

      /*
      Handles client event
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
        console.log(`user id: '${this.id}' registered: '${eventName}'`)
      }

      switch (socket.clientType) {
        case 'configuration':
        case 'queue ticket': {
          socket.handleClientQueueEvent('next queue', 'queue_number')
          socket.handleClientQueueEvent('request ticket', 'ticket_number')
          break
        }
        case 'operator': {
          socket.handleClientQueueEvent('next queue', 'queue_number')
          socket.handleClientQueueEvent('request ticket', 'ticket_number')
          socket.on('recall', () => io.to(socket.roomNum).emit('recall'))
          break
        }
        case 'queue info': {
          socket.handleClientQueueEvent('next queue', 'queue_number')
        }
      }
    }
  })

  socket.on('disconnect', function () {
    console.log(`A user ${socket.id} has disconnected`)
    console.log('----------')
  })
})

subscribe(listenToChannel('ezq_queue_number').forData('queue_number').andEmitEvent('queue update'))
subscribe(listenToChannel('ezq_ticket_number').forData('ticket_number').andEmitEvent('ticket update'))

function subscribe (subscriber) {
  subscriber.connect(subscriberConnected.bind(subscriber))
}

function subscriberConnected (msg) {
  SubscribeMessageParser.create(msg, this.dataKey, subscriberNotification.bind(this))
}

function subscriberNotification (roomNum, data) {
  if (roomNum) {
    console.log(`Emitting ${data} to room ${roomNum}`)
    io.to(roomNum).emit(this.emitEvent, data)
  }
}

function listenToChannel (channelName) {
  return ChannelSubscriber.create(process.env.DATABASE_URL, channelName)
}

console.log('listening on *:3000')
