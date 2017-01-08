var socket = io()

$(function () {
  socket.on('connect', function (data) {
  })

  socket.on('queue update', function (msg) {
    audio.playSoundFiles(msg)
    $('h1.current_queue').html(msg)
  })

  socket.on('ticket update', function (msg) {
    $('h1.ticket_queue').html(msg)
  })

  $('button.request_ticket').click( function () {
    socket.emit('request ticket')
  })
})