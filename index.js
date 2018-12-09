const debug = require('debug')('back-end')
const express = require('express')
const logger = require('morgan')
const chalk = require('chalk')
const bodyParser = require('body-parser')

const port = process.env.PORT || 3000
const app = express()

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static('public'))

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

function handleFatalError (err) {
  console.error(`${chalk.red('[fatal error]')} ${err.message}`)
  console.error(err.stack)
  process.exit(1)
}
process.on('uncaughtException', handleFatalError)
process.on('unhandledRejection', handleFatalError)

require('./routes/views')(app)
require('./routes/api')(app)
require('./routes/special')(app)

console.log('Iniciando Express.js')
app.listen(port, () => {
  console.log(`Server listening on port ${chalk.green(`${port}`)}`)
})
