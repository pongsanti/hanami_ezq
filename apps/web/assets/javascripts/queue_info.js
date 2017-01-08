var socket = io('/', {query: 'client_type=queue info'})

$(function () {
  socket.on('connect', function (data) {
  })

  socket.on('queue update', function (msg) {
    audio.playSoundFiles(msg)
    $('h1.current_queue').html(msg)
  })
})
