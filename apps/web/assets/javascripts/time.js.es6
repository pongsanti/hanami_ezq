/* global $ */
$(() => {
  function handler () {
    let time = new Date().toLocaleTimeString()
    $('.time').html(time)
  }
  setInterval(handler, 1000)
})