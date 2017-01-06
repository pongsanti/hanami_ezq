const querystring = require('querystring')

function unescape (input) {
  return querystring.unescape(input)
}

module.exports = unescape
