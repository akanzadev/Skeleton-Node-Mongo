const jwt = require('jsonwebtoken')
const config = require('../../config/config')

const generatedJwt = (uid) => {
  return new Promise((resolve, reject) => {
    const payload = { uid }
    jwt.sign(payload, config.JWT.TOKEN_SECRET, {
      expiresIn: config.JWT.TOKEN_EXPIRATION
    }, (err, token) => {
      if (err) {
        reject(err)
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
        reject(err)
      } else {
        resolve(decoded)
      }
    })
  })
}

module.exports = { generatedJwt, decodedJwt }
