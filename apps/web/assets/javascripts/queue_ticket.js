var socket = io()

$(function() {
  socket.on('connect', function (data) {
    //console.log('connected')
    //console.log(data)
  })

  socket.on('queue update', function(msg){
    $('h1.current_queue').html(msg);
  });

  $('button.request_ticket').click( function () {
    socket.emit('request ticket', '88');
  });
});