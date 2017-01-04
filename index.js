//var http = require('http')
require('dotenv').config({path: '.env.development'})
let decode = require('./ws/racksession/decoder')


var Server = require('socket.io')
var Cookie = require('cookie');
var io = new Server(3000)

io.on('connection', function (socket) {
  secret = process.env.WEB_SESSIONS_SECRET
  console.log(secret)
  
  console.log(`a user connected: ${socket.id}`)

  let cookie = socket.handshake.headers['cookie'];
  console.log(cookie)
  let parseCookie = Cookie.parse(cookie);
  let rackCookie = parseCookie['rack.session']
  console.log(rackCookie);

  decode_args = {secret: process.env.WEB_SESSIONS_SECRET, cookie: rackCookie };
  decode(decode_args, function (err, data) {
    console.log(data);
    console.log(data['warden.user.default.key'])
  });

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