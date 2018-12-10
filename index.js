const debug = require('debug')('back-end')
const express = require('express')
const logger = require('morgan')
const chalk = require('chalk')
const bodyParser = require('body-parser')
const cors = require('cors')
const jwt = require('./_helpers/jwt')
const errorHandler = require('./_helpers/error-handler')
const fatalErrorHandler = require('./_helpers/fatalerror-handler')

const app = express()

const port = process.env.PORT || 3000

app.use(logger('dev'))
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
  next();
});


app.use(express.static('public'));
app.use(cors())
app.use(jwt())

require('./routes/auth/auth.controller')(app)
require('./routes/api/clients/clients')(app)
require('./routes/api/policies/policies')(app)
require('./routes/special')(app)

app.use((err, req, res, next) => {
  debug(`Error: ${err.message}`)
  if (err.message.match(/not found/)) {
    return res.status(404).send({
      error: err.message
    })
  }
  res.status(500).send({
    error: err.message
  })
})

app.use(errorHandler)
app.use(fatalErrorHandler)
process.on('uncaughtException', fatalErrorHandler)
process.on('unhandledRejection', fatalErrorHandler)

console.log('Iniciando Express.js')
app.listen(port, () => {
  console.log(`Server listening on port ${chalk.green(`${port}`)}`)
})
