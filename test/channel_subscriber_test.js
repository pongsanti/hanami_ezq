require('chai').should()
let rackSessionParser = require('./../ws/channel_subscriber')

describe('channel subscriber', function () {
  it('should create new object with function constructor', function () {
    let parser = rackSessionParser.create('connString', 'queue update')
    parser.should.have.property('connectionString').with.equal('connString')
    parser.should.have.property('channelName').with.equal('queue update')
  })
})
