/*
Input
  - connection string
  - channel name
  - callback
Output (through callback)
  - error if any
  - message

Procedures
  1. Connect to database using input connection string.
  2. Query for channel.
  3. Send data through callback when notification event occurs.
*/

const pg = require('pg')

let ChannelSubscriber = {
  create: function (connectionString, channelName) {
    let self = Object.create(this)
    self.connectionString = connectionString
    self.channelName = channelName
    return self
  },

  connect: function (callback, injectPg = null) {
    let postgres = injectPg || pg
    this.clientConnectCallback = callback
    postgres.connect(this.connectionString, this.connectCallback.bind(this))
  },

  connectCallback: function (err, client) {
    if (err) {
      this.clientConnectCallback(new Error('Cannot connect to database.'))
    } else {
      this.client = client
      this.clientConnectCallback(null)
    }
  },

  listen: function (callback) {
    this.client.on('notification', function (msg) {
      callback(msg)
    })
    this.client.query(`LISTEN ${this.channelName}`)
  },

  end: function () {
    this.client.end()
  }
}

module.exports = ChannelSubscriber
