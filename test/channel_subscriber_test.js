require('chai').should()
let expect = require('chai').expect
let channel_subscriber = require('./../ws/channel_subscriber')

const connectionString = 'postgres://dev:dev@localhost/ezq_dev'

describe('channel subscriber', function () {
  it('should create new object with function constructor', function () {
    let subscriber = channel_subscriber.create('connString', 'queue update')
    subscriber.should.have.property('connectionString').with.equal('connString')
    subscriber.should.have.property('channelName').with.equal('queue update')
  })

  it.skip('should connect to database successfully', function (done) {
    let subscriber = channel_subscriber.create(connectionString, 'queue update')
    subscriber.connect(function (err) {
      expect(err).to.be.null
      subscriber.should.have.property('client')
      done()
    })
  })

  it.skip('should return error if connection failure', function (done) {
    let subscriber = channel_subscriber.create('invalid connection string', 'queue update')
    subscriber.connect(function (err) {
      err.should.be.an('error')
      subscriber.should.not.have.property('client')
      done()
    })
  })

  it('should listen to channel name')
})
