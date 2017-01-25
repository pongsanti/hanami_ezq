/* global io, $, audio, printer, userLogoutListener */

var socket = io('/', {query: 'client_type=queue ticket'})

$(() => {
  socket.on('connect', (data) => {
  })

  socket.on('queue update', (msg) => {
    if (msg !== 0) {
      audio.playSoundFiles(msg)
    }
    $('p.current-queue').html(msg)
  })

  socket.on('ticket update', (msg) => {
    $('p.ticket-queue').html(msg)
    if (msg !== 0 && printer.enable) {
      printer.print()
    }
  })

  socket.on('recall', () => {
    audio.playSoundFiles($('p.current-queue').html())
  })

  userLogoutListener.listen(socket)

  $('div.request-ticket').click(() => {
    socket.emit('request ticket')
  })
})
