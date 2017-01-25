/* global io, $, audio, userLogoutListener, confirm */

var socket = io('/', {query: 'client_type=configuration'})

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

  socket.on('ticket update', (msg) => {
    $('p.ticket-queue').html(msg)
  })

  userLogoutListener.listen(socket)

  let resetQueueForm = $('form#user-reset-queue-form')
  let resetTicketForm = $('form#user-reset-ticket-form')
  let resetQueueBtnDiv = $('div.reset-queue')
  let resetTicketBtnDiv = $('div.reset-ticket')

  resetQueueBtnDiv.click(() => {
    if (confirm('Do you really want to reset queue number to zero?')) {
      resetQueueForm.submit()
    }
  })

  resetTicketBtnDiv.click(() => {
    if (confirm('Do you really want to reset ticket number to zero?')) {
      resetTicketForm.submit()
    }
  })
})
