/*
Input
  - cookie header string
  - secret key
Output
  - object of rack session
Procedures
  1. Unescapes the input string.
  2. Parse the string, so that we get cookie obj.
  3. Interested only on the cookie entry named 'rack.session'
  4. Verify if the split digest matched the computed digest.
  5. Marshal cookie value
  6. Got rack session obj.
*/
const fnUnescape = require('./unescape')
const fnParseCookie = require('./cookie_parser')
const crypto = require('crypto')
const marsha = require('marsha')

let rackSessionParser = {

  create: function (cookieString, secret, cookieKey = null) {
    let self = Object.create(this)
    self.cookieString = cookieString
    self.secret = secret
    self.cookieKey = cookieKey || 'rack.session'

    self.separator = '--'
    return self
  },

  // Main methods. This method calls others.
  parse: function (callback) {
    this.splitCookieValue()
    this.computeHexDigest()
    if (this.isHexDigestMatch()) {
      this.marshalCookieValue()
      callback(null, this.rackSessionCookie)
    } else {
      callback(new Error('Rack cookie is invalid'), null)
    }
  },

  /* private methods */
  unescape: function (cookieString = null) {
    let cstring = cookieString || this.cookieString
    return fnUnescape(cstring)
  },

  parseCookie: function (cookieString = null) {
    let cstring = cookieString || this.unescape()
    return fnParseCookie(cstring)
  },

  cookieValue: function (cookieObj = null) {
    let cobj = cookieObj || this.parseCookie()
    return cobj[this.cookieKey]
  },

  splitCookieValue: function (cookieValue = null) {
    let cval = cookieValue || this.cookieValue()
    let splitted = cval.split(this.separator)
    this.base64Val = splitted[0]
    this.hexDigestVal = splitted[1]
  },

  computeHexDigest: function (base64Val = null, secret = null) {
    let b64Val = base64Val || this.base64Val
    let sec = secret || this.secret
    let hmac = crypto.createHmac('sha1', sec)
    hmac.update(b64Val)
    this.computedHexDigestVal = hmac.digest('hex')
  },

  isHexDigestMatch: function (hexDigestVal = null, computedVal = null) {
    let hexDigest = hexDigestVal || this.hexDigestVal
    let computed = computedVal || this.computedHexDigestVal
    return hexDigest === computed
  },

  marshalCookieValue: function (base64Val = null) {
    let b64Val = base64Val || this.base64Val
    this.rackSessionCookie = marsha.load(b64Val, 'base64')
  }
}

module.exports = rackSessionParser
