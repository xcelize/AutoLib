const fs = require('fs')
const bodyParser = require('body-parser')
const jsonServer = require('json-server')
const jwt = require('jsonwebtoken')
const { decode } = require('querystring')

const server = jsonServer.create()
const router = jsonServer.router('db.json')

const userData = JSON.parse(fs.readFileSync('./clients.json', 'UTF-8'))

server.use(jsonServer.defaults())

const SECRET_KEY = '123456789'
const expiresIn = '1h'

// Create a token from a payload
function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn })
}

// Verify the token
function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY, (err, decode) =>
    decode !== undefined ? decode : err)
}

// Check if the user exists in database
function isAuthenticated({ login, password }) {
  return userData.findIndex(user => user.login === login && user.mdp === password)
}

server.post('/auth/login', (req, res) => {
  const { login, password } = req.body
  if (isAuthenticated({ login, password }) === false) {
    const status = 401
    const message = 'Identifiant ou mot de passe incorrect'
    res.stats(status).json({ status, message })
    return
  }
  const access_token = createToken({ login, password })
  res.status(200).json({access_token})
})

// Control access excluding /auth & /stations
server.use(/^(?!\/(auth|stations|clients)).*$/, (req, res, next) => {
  if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
    const status = 401
    const message = 'Bad authorization header'
    res.status(status).json({ status, message })
    return
  }
  try {
    verifyToken(req.headers.authorization.split(' ')[1])
    next()
  } catch (err) {
    const status = 401
    const message = 'Erreur: access_token non valide'
    res.status(status).json({status, message})
  }
})

server.use(router)
server.listen(44333, () => {
  console.log('Run Auth API server')
})
