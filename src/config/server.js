const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const config = require('./config')
const connection = require('../database/connection')

const {
  logErrors,
  errorHandler,
  wrapErrors
} = require('../utils/middlewares/errorHandler')
const notFoundHandler = require('../utils/middlewares/notFoundHandler')

class Server {
  constructor () {
    this.app = express()
    // Middlewares
    this.middlewares()
    // Routes
    this.routes()
    // Not found
    this.notFound()
    // Manejo de errores
    this.errorHandler()
    // Connect to DB
    this.connectDB()
  }

  middlewares () {
    // CORS
    this.app.use(cors())
    // Morgan
    this.app.use(morgan('dev'))
    // Parsed JSON
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: false }))
    // Directorio publico
    this.app.use(express.static('public'))
  }

  async connectDB () {
    await connection()
  }

  routes () {
    this.app.use('/api/auth', require('../auth/auth.routes'))
    this.app.use('/api/users', require('../user/user.routes'))
    // this.app.use('/api/products', require('../product/products/products.routes'))
    this.app.use('/api/categories', require('../product/categories/categories.routes'))
  }

  errorHandler () {
    this.app.use(logErrors)
    this.app.use(wrapErrors)
    this.app.use(errorHandler)
  }

  notFound () {
    this.app.use(notFoundHandler)
  }

  listen () {
    this.app.listen(config.SERVER.PORT, () => {
      console.log('Server on port ', config.SERVER.PORT)
    })
  }
}

module.exports = Server
