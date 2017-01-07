// var http = require('http')
require('dotenv').config({path: '.env.development'})
var RackSessionParser = require('./ws/rack_session_parser')
let ChannelSubscriber = require('./ws/channel_subscriber')

var Server = require('socket.io')
var io = new Server(3000)

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
      io.to(socket.roomNum).emit('queue update', 'Hello number 5')
    }
  })

  socket.on('disconnect', function () {
    console.log(`A user ${socket.id} has disconnected`)
    console.log('----------')
  })

  socket.on('request ticket', function (msg) {
    if (socket.roomNum) {
      io.to(socket.roomNum).emit('queue update', msg)
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
        console.log(`Emitting ${queueNumber} to room ${roomNum}`)
        io.to(roomNum).emit('queue update', queueNumber)
      }
    })
  }
})

console.log('listening on *:3000')
