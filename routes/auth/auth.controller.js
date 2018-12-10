const authService = require('./auth.service')

module.exports = (app) => {
  app.post('/authenticate', (req, res, next) => {
    console.log(req.body);
    authService.authenticate(req.body)
      .then(user => user ? res.json(user) : res.status(400).json({
        message: 'Username or password is incorrect'
      }))
      .catch(err => next(err))
  }
  )
}
