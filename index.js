// var http = require('http')
require('dotenv').config({path: '.env.development'})
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
      }

      switch (socket.clientType) {
        case 'queue ticket':
        case 'operator': {
          socket.handleClientQueueEvent('request ticket', 'ticket_number')
          console.log(`user id: '${socket.id}' registered: 'request ticket'`)
        }
        default: {
          socket.handleClientQueueEvent('next queue', 'queue_number')
          console.log(`user id: '${socket.id}' registered: 'next queue'`)
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
  subscriber.connect(function (err) {
    if (err) {
      console.log(err)
    } else {
      console.log(`Subscribed to channel '${subscriber.channelName}' for data key '${subscriber.dataKey}' to emit event '${subscriber.channelName}'`)
      subscriber.listen(function (msg) {
        SubscribeMessageParser.create(msg, subscriber.dataKey, function (roomNum, data) {
          if (roomNum) {
            console.log(`Emitting ${data} to room ${roomNum}`)
            io.to(roomNum).emit(subscriber.emitEvent, data)
          }
        })
      })
    }
  })
}

function listenToChannel (channelName) {
  let subscriber = ChannelSubscriber.create(process.env.DATABASE_URL, channelName)
  subscriber.forData = forData.bind(subscriber)
  return subscriber
}

function forData (dataKey) {
  this.dataKey = dataKey
  this.andEmitEvent = andEmitEvent.bind(this)
  return this
}

function andEmitEvent (eventName) {
  this.emitEvent = eventName
  return this
}

console.log('listening on *:3000')
