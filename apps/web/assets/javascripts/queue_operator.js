var socket = io('/', {query: 'client_type=operator'})

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

  $('div.next-queue').click(function () {
    socket.emit('next queue')
  })

  $('button.recall-queue').click(function () {
    socket.emit('recall')
  })
})
