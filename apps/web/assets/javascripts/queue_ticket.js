var socket = io('/', {query: 'client_type=queue ticket'})

$(function () {
  socket.on('connect', function (data) {
  })

  socket.on('queue update', function (msg) {
    if (msg !== 0) {
      audio.playSoundFiles(msg)
    }
    $('h1.current_queue').html(msg)
  })

  socket.on('ticket update', function (msg) {
    $('h1.ticket_queue').html(msg)
  })

  socket.on('recall', function () {
    audio.playSoundFiles($('h1.current_queue').html())
  })  

  $('button.request_ticket').click(function () {
    socket.emit('request ticket')
  })
})
