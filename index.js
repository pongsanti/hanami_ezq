//var http = require('http')

var Server = require('socket.io')
var io = new Server(3000)

io.on('connection', function (socket) {
  console.log(`a user connected: ${socket.id}`)


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