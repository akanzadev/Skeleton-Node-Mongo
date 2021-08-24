const jwt = require('jsonwebtoken')
const config = require('../../config/config')

const generatedJwt = (uid) => {
  return new Promise((resolve, reject) => {
    const payload = { uid }
    jwt.sign(payload, config.JWT.TOKEN_SECRET, {
      expiresIn: config.JWT.TOKEN_EXPIRATION
    }, (err, token) => {
      if (err) {
        console.log('Error al generar jwt')
        reject(err)
      } else {
        resolve(token)
      }
    })
  })
}

const decodedJwt = (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET)
  return decoded
}

module.exports = { generatedJwt, decodedJwt }
