require('chai').should()
var cookieParser = require('./../ws/cookie_parser')

describe('cookieParser', function () {
  it('should return cookie object', function () {
    let parsedObj = cookieParser('rack.session=ABCD; io=EFGH')
    parsedObj.should.have.property('rack.session').with.equal('ABCD')
    parsedObj.should.have.property('io').with.equal('EFGH')
  })
})
