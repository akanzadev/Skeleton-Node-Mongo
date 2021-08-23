const mongoose = require('mongoose')
const config = require('../config/config')

const connection = async () => {
  try {
    await mongoose.connect(config.DB_MONGO.URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    })
    console.log('Base de datos conectada con éxito')
  } catch (error) {
    console.log('Error al conectarse a Base de datos', error)
  }
}

module.exports = connection
