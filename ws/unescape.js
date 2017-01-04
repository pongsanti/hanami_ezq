const querystring = require('querystring');

unescape = function (input) {
  return querystring.unescape(input);
};

module.exports = unescape;