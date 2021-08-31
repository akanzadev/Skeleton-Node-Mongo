// Multer configuracion
const multer = require('multer')
const path = require('path')
const boom = require('@hapi/boom')
// Guardar datos en disco con ruta especificada
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads'))
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + '-' + file.originalname)
  }
})
// Filtrar tipo de archivos
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true)
  } else {
    // Enviar error
    cb(null, false)
    // Crear error para capturarlo con boom
    const error = new Error('Solo se permiten imagenes')
    cb(boom.boomify(error, { statusCode: 400 }))
  }
}
// Asignando configuraciones
const limits = 100000 // bytes
const uploadHandler = multer({
  storage,
  fileFilter,
  limits

}).single('image')
module.exports = { uploadHandler }
