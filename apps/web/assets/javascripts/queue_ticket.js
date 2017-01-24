var socket = io('/', {query: 'client_type=queue ticket'})

$(function () {
  socket.on('connect', function (data) {
  })

  socket.on('queue update', function (msg) {
    if (msg !== 0) {
      audio.playSoundFiles(msg)
    }
    $('p.current-queue').html(msg)
  })

  socket.on('ticket update', function (msg) {
    $('p.ticket-queue').html(msg)
  })

  socket.on('recall', function () {
    audio.playSoundFiles($('p.current-queue').html())
  })  

  $('div.request-ticket').click(function () {
    socket.emit('request ticket')
  })
})
