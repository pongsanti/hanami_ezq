const querystring = require('querystring');
const crypto = require('crypto');
const buffer = require('buffer');
const marsha = require('marsha');

const decode = function (args, callback) {
  let secret = args['secret'];
  let cookie = args['cookie'];

  let unescape_rack_cookie = unescape(cookie);

  if(validateDigest(secret, unescape_rack_cookie)) {
    let rack_session_obj = marsha.load(unescape_rack_cookie, 'base64')
    callback(null, rack_session_obj);
  } else {
    callback(new Error('cookie invalid'), null);
  }
}

function validateDigest (secret, rackCookie) {
  [b64Value, hexDigest] = rackCookie.split('--');
  return hexDigest === hmac(secret, b64Value);
}

function unescape (st) {
  return querystring.unescape(st)
}

function hmac (secret, cookie) {
  hmac = crypto.createHmac('sha1', secret)
  hmac.update(cookie)
  return hmac.digest('hex')
}

module.exports = decode