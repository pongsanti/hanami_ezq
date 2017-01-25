/* global location */

var userLogoutListener = {
  listen: (socket) => {
    socket.on('user logout', () => {
      location.href = '/'
    })
  }
}
