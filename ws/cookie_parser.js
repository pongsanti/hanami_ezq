var Cookie = require('cookie');

function cookieParser (input) {
  return  Cookie.parse(input);
}

module.exports = cookieParser;