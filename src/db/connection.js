const pgp = require('pg-promise')()

const config = {
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT
}

const db = pgp(config)

module.exports = db
