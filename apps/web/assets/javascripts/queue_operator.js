var socket = io('/', {query: 'client_type=operator'})

$(function () {
  socket.on('connect', function (data) {
  })

  socket.on('queue update', function (msg) {
    if (msg !== 0) {
      audio.playSoundFiles(msg)
    }
    $('h1.current-queue').html(msg)
  })

  socket.on('ticket update', function (msg) {
    $('h1.ticket-queue').html(msg)
  })

  socket.on('recall', function () {
    audio.playSoundFiles($('h1.current-queue').html())
  })

  $('button.next-queue').click(function () {
    socket.emit('next queue')
  })

  $('button.recall-queue').click(function () {
    socket.emit('recall')
  })
})
