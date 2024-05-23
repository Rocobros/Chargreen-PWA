const jwt = require('jsonwebtoken')
require('dotenv').config()

const JWT_SECRET = process.env.JWT_SECRET

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  // If no token is found, return 401 (Unauthorized)
  if (!token) {
    return res.sendStatus(401)
  }

  // Verify the token
  jwt.verify(token, JWT_SECRET, (err, user) => {
    // If there's an error verifying the token, return 403 (Forbidden)
    if (err) {
      console.error('JWT verification error:', err) // Log error for debugging
      return res.sendStatus(403)
    }
    // Attach the user to the request object
    req.user = user
    // Call the next middleware or route handler
    next()
  })
}

module.exports = authenticateToken
