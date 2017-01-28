/* global $ */

$(() => {
  // close icon
  $('.ui.message .close.icon').click ((event)=> {
    $(event.target).parent().hide()
  })
})