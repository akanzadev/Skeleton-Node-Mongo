const { OAuth2Client } = require('google-auth-library')
const config = require('../../config/config')
const client = new OAuth2Client(config.GOOGLE.CLIENT_ID)

const verifyGoogleToken = async (idToken) => {
  const ticket = await client.verifyIdToken({
    idToken,
    audience: config.GOOGLE.CLIENT_ID
  })
  const { email, name, picture: avatar } = ticket.getPayload()
  /* const userid = payload.sub */
  return { email, name, avatar }
}

module.exports = { verifyGoogleToken }
