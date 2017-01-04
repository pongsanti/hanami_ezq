const crypto = require('crypto');
const marsha = require('marsha');

module.exports = {
  marshal: function (b64Value) {
    return marsha.load(b64Value, 'base64');
  },

  splitRackCookie: function (rackCookie) {
    return rackCookie.split('--');
  },

  hmac: function (secret, cookie) {
    hmac = crypto.createHmac('sha1', secret)
    hmac.update(cookie)
    return hmac.digest('hex')
  }  
};