var socket = io('/', {query: 'client_type=queue info'})

$(function () {
  // bind audio toggle
  $('input.audio-toggle').change(function () {
    audio.enable = this.checked
  })

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

  // toggle audio
  $('input.audio-toggle').prop('checked', true).trigger('change')
})
