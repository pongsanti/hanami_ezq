var socket = io('/', {query: 'client_type=queue info'})

$(function () {
  socket.on('connect', function (data) {
  })

  socket.on('queue update', function (msg) {
    if (msg !== 0) {
      audio.playSoundFiles(msg)
    }
    $('p.current-queue').html(msg)
  })

  socket.on('recall', function () {
    audio.playSoundFiles($('p.current-queue').html())
  })

  userLogoutListener.listen(socket)

  // toggle audio only for queue info page
  $('input.audio-toggle').prop('checked', true).trigger('change')
})
