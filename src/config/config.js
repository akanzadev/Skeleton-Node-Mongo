require('dotenv').config({ path: 'src/env/.env' })

const config = {
  SERVER: {
    PORT: process.env.PORT || 8080,
    MODE: process.env.MODE || 'DEV'
  },
  DB_MONGO: {
    URI:
      process.env.DB_MONGO_URI ||
      'mongodb+srv://<username>:<password>@cluster0.byux7.mongodb.net/test'
  }
}

module.exports = config
