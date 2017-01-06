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

let ChannelSubscriber = {
  create: function (connectionString, channelName) {
    let self = Object.create(this)
    self.connectionString = connectionString
    self.channelName = channelName
    return self
  }
}

module.exports = ChannelSubscriber
