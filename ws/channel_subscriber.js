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
      console.log('Cannot connect to database.')
    } else {
      this.client = client
      console.log(`Subscribed to channel '${this.channelName}' for data key '${this.dataKey}' to emit event '${this.channelName}'`)
      this.listen()
    }
  },

  listen: function () {
    let self = this
    this.client.on('notification', function (msg) {
      self.clientConnectCallback(msg)
    })
    this.client.query(`LISTEN ${this.channelName}`)
  },

  end: function () {
    this.client.end()
  },

  // for DSL sake
  forData: function (dataKey) {
    this.dataKey = dataKey
    return this
  },

  // for DSL sake
  andEmitEvent: function (eventName) {
    this.emitEvent = eventName
    return this
  }
}

module.exports = ChannelSubscriber
