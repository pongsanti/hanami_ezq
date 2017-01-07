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

  socket.on('request ticket', function (msg) {
    if (socket.roomNum) {
      let sql = `UPDATE users SET ticket_number = ticket_number + 1 WHERE id = ${socket.roomNum}`
      console.log(sql)
      pgClient.query(sql, function (err, result) {
        if (err) {
          console.log(err)
        }
      })
    }
  })
})

// Initialize Channel Subscriber
let channelSub = ChannelSubscriber.create(process.env.DATABASE_URL, 'ezq')
channelSub.connect(function (err) {
  if (err) {
    console.log(err)
  } else {
    channelSub.listen(function (msg) {
      let payload = JSON.parse(msg['payload'])
      console.log(payload)
      let roomNum = payload.user_id
      let queueNumber = payload.queue_number
      let ticketNumber = payload.ticket_number
      if (roomNum) {
        console.log(`Emitting ${payload} to room ${roomNum}`)
        io.to(roomNum).emit('queue update', queueNumber)
      }
    })
  }
})

console.log('listening on *:3000')
