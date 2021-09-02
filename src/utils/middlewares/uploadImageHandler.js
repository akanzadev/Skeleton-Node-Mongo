const cloudinary = require('../../config/cloudinary')
const fs = require('fs-extra')
const uploadImageHandler = async (req, res, next) => {
  try {
    const { file } = req
    if (!file) return next()
    /*
    *Guardarlo de manera local en el servidor
    *const { filename } = file
    *req.body.image = filename
    */
    const { filename, path } = file
    // Enviar imagen a cloudinary
    const fileArray = filename.split('.')
    const filenameCloud = fileArray[0]
    const result = await cloudinary.uploader.upload(path, {
      public_id: `rest-node-server/images/${filenameCloud}`
    })
    // Eliminando la imagen que multer guardo localmente
    await fs.unlink(file.path)
    req.body.image = result.secure_url
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = { uploadImageHandler }
