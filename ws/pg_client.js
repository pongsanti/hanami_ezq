const pg = require('pg')
const url = require('url')

let pgClient = {
  create: function (databaseUrl, maxConnection = 10, idleTimeoutMillis = 30000) {
    // parsing database url
    const params = url.parse(databaseUrl)
    const auth = params.auth.split(':')
    const config = {
      user: auth[0],
      password: auth[1],
      host: params.hostname,
      port: params.port,
      database: params.pathname.split('/')[1]
    }

    config.max = maxConnection
    config.idleTimeoutMillis = idleTimeoutMillis

    let self = Object.create(this)
    this.pool = new pg.Pool(config)

    return self
  },

  query: function (sql, callback) {
    this.pool.query(sql, function (err, res) {
      if (err) {
        callback(err, null)
      } else {
        callback(null, res)
      }
    })
  }
}

module.exports = pgClient
