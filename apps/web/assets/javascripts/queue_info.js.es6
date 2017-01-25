/* global io, $, audio, userLogoutListener */

var socket = io('/', {query: 'client_type=queue info'})

$(() => {
  socket.on('connect', (data) => {
  })

  socket.on('queue update', (msg) => {
    if (msg !== 0) {
      audio.playSoundFiles(msg)
    }
    $('p.current-queue').html(msg)
  })

  socket.on('recall', () => {
    audio.playSoundFiles($('p.current-queue').html())
  })

  userLogoutListener.listen(socket)

  // toggle audio only for queue info page
  $('input.audio-toggle').prop('checked', true).trigger('change')
})
