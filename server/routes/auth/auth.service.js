const config = require('../../../config.json')
const jwt = require('jsonwebtoken')

// users hardcoded for simplicity, store in a db for production applications
const users = [{ id: 1, username: 'test', password: 'test' }]

module.exports = {
  authenticate
}
async function authenticate ({ username, password, role }) {
  const user = users.find(u => u.username === username && u.password === password)
  if (user) {
    const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: 129600 })
    const {
      password,
      ...userWithoutPassword
    } = user
    return {
      ...userWithoutPassword,
      role,
      token
    }
  } else {
    res.status(401).json({
      sucess: false,
      token: null,
      err: 'Username or password is incorrect'
    });
  }
}
