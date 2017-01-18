require('chai').should()
let expect = require('chai').expect
let Parser = require('./../ws/subscribe_message_parser')

const message = { flow_id: '13245',
  payload: '{ "user_id": "15", "interested_data": "Hey" }' }
const dataKey = 'interested_data'

describe('subscribe message parser', function () {
  it('should create new object with arguments', function () {
    let parser = Parser.create(message, dataKey, function () {})
    parser.should.have.property('message').with.equal(message)
    parser.should.have.property('dataKey').with.equal(dataKey)
  })

  it('should return parsed data via callback', function (done) {
    Parser.create(message, dataKey, function (userId, data) {
      expect(userId).to.equal('15')
      expect(data).to.equal('Hey')
      done()
    })
  })
})
