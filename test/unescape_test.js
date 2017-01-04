var should = require('chai').should();
var unescape = require('./../ws/unescape');

describe('Unescape', function() {
  it('should return unescape html', function() {
      unescape('%3D%3D%3E').should.equal('==>');
  });

  it('should return normal text if unescape not required', function() {
      unescape('ABC').should.equal('ABC');
  });
});