let should = require('chai').should()
let rackSessionParser = require('./../ws/rack_session_parser')

describe('rack cookie parser', function () {
  it('should create new object with function constructor', function () {
    let parser = rackSessionParser.create('rack.session=ABCD; io=EFGH', 'sekr3t')
    parser.should.have.property('cookieString').with.equal('rack.session=ABCD; io=EFGH')
    parser.should.have.property('secret').with.equal('sekr3t')
    parser.should.have.property('cookieKey').with.equal('rack.session')
  })

  describe('object', function () {
    const cookieString = 'io=FM7OmvX4rzBU7vC1AAAD; rack.session=BAh7CEkiD3Nlc3Npb25faWQGOgZFVEkiRTAwMzVhOTYxNzlmZTJiMzU2NTJh%0AYzcxZDEzMDg3MTZlMzI2NDIxOGQ4NmRkMmZhN2VjNTg2MDRjNzhkOWJhNDAG%0AOwBGSSIQX2NzcmZfdG9rZW4GOwBGSSJFMmJkN2U4YmU3NzJiNTg1ZjkxMTBj%0ANjkwYjY5N2ZiZWRiOTc2Mjc5ODNmM2FkZGFhMjllN2RmMTExZmMzZTEwMAY7%0AAEZJIhx3YXJkZW4udXNlci5kZWZhdWx0LmtleQY7AFRpBg%3D%3D%0A--3b3daa858c80828c7ff50b0046f514f1ea492de7'
    const secret = '8b65a225839451409fdd0dca6389fe3118a2f99d8b4ee4bb4bbf57f24ed9a190'
    const cookieKey = 'rack.session'

    let parser
    beforeEach(function () {
      parser = rackSessionParser.create(cookieString, secret, cookieKey)
    })

    it('should parse successfully', function () {
      parser.parse(function (err, rackSessionObj) {
        should.not.exist(err)
        rackSessionObj.should.have.property('warden.user.default.key').with.equal(1)
      })
    })

    it('should return error when session invalid', function () {
      parser.secret = '8b65a225839451409fdd0dca6389fe3118a2f99d8b4ee4bb4bbf57f24ed9a19' + '1'
      parser.parse(function (err, rackSessionObj) {
        err.should.be.an('error')
        should.not.exist(rackSessionObj)
      })
    })

    it('should unescape the cookie string', function () {
      parser.unescape('rack.session=ABCD%3D%3D%3E; io=EFGH').should.be.equal('rack.session=ABCD==>; io=EFGH')
    })

    it('should parse the cookie string', function () {
      let parsed = parser.parseCookie()
      parsed.should.have.property('rack.session')
      parsed.should.have.property('io').with.equal('FM7OmvX4rzBU7vC1AAAD')
    })

    it('should get cookie value from input cookie key entry name', function () {
      let cookieValue = parser.cookieValue({'rack.session': 'ABCD'})
      cookieValue.should.be.equal('ABCD')
    })

    it('should split base64 value from hex digest value', function () {
      parser.splitCookieValue()
      parser.should.have.property('base64Val').with.equal(`BAh7CEkiD3Nlc3Npb25faWQGOgZFVEkiRTAwMzVhOTYxNzlmZTJiMzU2NTJh
YzcxZDEzMDg3MTZlMzI2NDIxOGQ4NmRkMmZhN2VjNTg2MDRjNzhkOWJhNDAG
OwBGSSIQX2NzcmZfdG9rZW4GOwBGSSJFMmJkN2U4YmU3NzJiNTg1ZjkxMTBj
NjkwYjY5N2ZiZWRiOTc2Mjc5ODNmM2FkZGFhMjllN2RmMTExZmMzZTEwMAY7
AEZJIhx3YXJkZW4udXNlci5kZWZhdWx0LmtleQY7AFRpBg==
`)
      parser.should.have.property('hexDigestVal').with.equal('3b3daa858c80828c7ff50b0046f514f1ea492de7')
    })

    describe('already parsed cookie', function () {
      beforeEach(function () {
        parser.splitCookieValue()
        parser.computeHexDigest()
      })

      it('should compute hex digest value', function () {
        parser.should.have.property('computedHexDigestVal').with.equal('3b3daa858c80828c7ff50b0046f514f1ea492de7')
      })

      it('should check if the hex digest and computed value match', function () {
        parser.isHexDigestMatch().should.be.true
      })

      it('should marshal cookie value', function () {
        parser.marshalCookieValue()
        parser.should.have.property('rackSessionCookie')
      })
    })
  })
})
