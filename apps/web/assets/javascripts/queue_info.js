var socket = io()

$(function() {
  socket.on('connect', function (data) {
  })

  socket.on('queue update', function(msg){
    $('h1.current_queue').html(msg)
  })
})