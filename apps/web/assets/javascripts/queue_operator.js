var socket = io()

$(function() {
  socket.on('connect', function (data) {
  })

  socket.on('queue update', function(msg){
    $('h1.current_queue').html(msg)
  })

  socket.on('ticket update', function(msg){
    $('h1.ticket_queue').html(msg)
  })

  $('button.next_queue').click( function () {
    socket.emit('next queue')
  })

  $('button.recall_queue').click( function () {
    socket.emit('play sound')
  })  
})