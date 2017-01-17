var socket = io('/', {query: 'client_type=queue info'})

$(function () {
  socket.on('connect', function (data) {
  })

  socket.on('queue update', function (msg) {
    if (msg !== 0) {
      audio.playSoundFiles(msg)
    }
    $('h1.current_queue').html(msg)
  })

  socket.on('recall', function () {
    audio.playSoundFiles($('h1.current_queue').html())
  })

  // toggle audio only for queue info page
  $('input.audio-toggle').prop('checked', true).trigger('change')
})
