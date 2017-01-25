/* global io, $, audio, userLogoutListener */

var socket = io('/', {query: 'client_type=operator'})

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
  })

  socket.on('recall', () => {
    audio.playSoundFiles($('p.current-queue').html())
  })

  userLogoutListener.listen(socket)

  $('div.next-queue').click(() => {
    socket.emit('next queue')
  })

  $('button.recall-queue').click(() => {
    socket.emit('recall')
  })
})
