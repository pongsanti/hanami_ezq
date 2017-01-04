var socket = io()
socket.on('connect', function (data) {
  console.log('connected')
  console.log(data)
})

socket.on('queue update', function(msg){
  $('h1.current_queue').html(msg);
});

console.log('Listening...')