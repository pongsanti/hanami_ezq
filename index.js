// var http = require('http')
require('dotenv').config({path: '.env.development'})
var unescape = require('./ws/unescape')
var cookieParser = require('./ws/cookie_parser')
var decode = require('./ws/decoder')

var Server = require('socket.io')
var io = new Server(3000)

io.on('connection', function (socket) {
  console.log(`a user connected: ${socket.id}`)
  let secret = process.env.WEB_SESSIONS_SECRET

  let cookie = socket.handshake.headers['cookie']
  let parseCookie = cookieParser(unescape(cookie))
  let rackCookie = parseCookie['rack.session']

  let [b64Value, hexDigest] = decode.splitRackCookie(rackCookie)
  if (hexDigest === decode.hmac(secret, b64Value)) {
    let rackSessionObj = decode.marshal(b64Value)
    if (rackSessionObj['warden.user.default.key']) {
      let roomNum = rackSessionObj['warden.user.default.key']
      socket.roomNum = roomNum
      console.log(`A user id: ${socket.id} is joining room: ${roomNum}`)

      socket.join(roomNum)
      io.to(socket.roomNum).emit('queue update', 'Hello number 5')
    } else {
      console.log('session invalid')
    }
  } else {
    console.log('session invalid')
  }

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

console.log('listening on *:3000')
