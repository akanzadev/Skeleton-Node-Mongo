
const uploadImageHandler = (req, res, next) => {
  const { file } = req
  if (!file) return next()
  const { filename } = file
  req.body.image = filename
  next()
}

module.exports = { uploadImageHandler }
