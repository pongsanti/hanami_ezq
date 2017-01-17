/*
Input
  - message
  - dataKey
  - callback(userId, message)
Output (through callback)
  - error if any
  - parsed message

Procedures
  1. Interested only 'payload' field of the message object
  2. Parse the message to JSON object
  3. Logging
  4. Send data through callback when notification event occurs.
*/

let SubscribeMessageParser = {
  create: function (message, dataKey, callback) {
    let self = Object.create(this)
    self.message = message
    self.dataKey = dataKey

    self.parse(callback)
    return self
  },

  parse: function (callback) {
    console.log(this.message)
    let payload = JSON.parse(this.message['payload'])
    let userId = payload.user_id
    let data = payload[this.dataKey]
    callback(userId, data)
  }
}

module.exports = SubscribeMessageParser
