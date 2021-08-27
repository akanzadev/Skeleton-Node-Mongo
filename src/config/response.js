const handleSuccess = (res, req, data, message, status = 200) => {
  res.status(status).json({
    status,
    message,
    data
  })
}
const handleError = (res, req, message, error, status = 500) => {
  res.status(status).json({
    status,
    message,
    error
  })
}

module.exports = {
  handleSuccess,
  handleError
}
