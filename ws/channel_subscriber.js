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

  connect: function (callback) {
    console.log('connect')
    let self = this
    pg.connect(this.connectionString, function (err, client) {
      if (err) {
        callback(new Error('Cannot connect to database.'))
      } else {
        self.client = client
        callback(null)
      }
    })
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
