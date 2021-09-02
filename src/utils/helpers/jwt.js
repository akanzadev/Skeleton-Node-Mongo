const jwt = require('jsonwebtoken')
const config = require('../../config/config')
const boom = require('@hapi/boom')
const generatedJwt = (uid) => {
  return new Promise((resolve, reject) => {
    const payload = { uid }
    jwt.sign(payload, config.JWT.TOKEN_SECRET, {
      expiresIn: config.JWT.TOKEN_EXPIRATION
    }, (err, token) => {
      if (err) {
        reject(boom.unauthorized('Token invalid'))
      } else {
        resolve(token)
      }
    })
  })
}

const decodedJwt = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.JWT.TOKEN_SECRET, (err, decoded) => {
      if (err) {
        reject(boom.unauthorized('Invalid token'))
      } else {
        resolve(decoded)
      }
    })
  })
}

module.exports = { generatedJwt, decodedJwt }
