//var http = require('http')
require('dotenv').config({path: '.env.development'})
var unescape = require('./ws/unescape');
var cookieParser = require('./ws/cookie_parser');
var decode = require('./ws/decoder');

var Server = require('socket.io')
var io = new Server(3000)

io.on('connection', function (socket) {
  console.log(`a user connected: ${socket.id}`)
  secret = process.env.WEB_SESSIONS_SECRET

  let cookie = socket.handshake.headers['cookie'];
  let parseCookie = cookieParser(unescape(cookie));
  let rackCookie = parseCookie['rack.session']

  let [b64Value, hexDigest] = decode.splitRackCookie(rackCookie);
  if (hexDigest === decode.hmac(secret, b64Value)) {
    rackSessionObj = decode.marshal(b64Value);
    console.log(rackSessionObj);
    console.log(rackSessionObj['warden.user.default.key']);
  } else {
    console.log('session invalid');
  }

  socket.on('disconnect', function () {
    console.log('user disconnected')
  })

  socket.on('chat message', function (msg) {
    console.log('message: ' + msg)
    io.emit('chat message', msg)
  })

  io.emit('queue update', "Hello number 5")
  console.log("emitted")

})

/*
http.listen(3000, function () {
  console.log('listening on *:3000')
})
*/