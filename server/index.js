const chalk = require('chalk')
const app = require('./app')

const port = process.env.PORT || 3000

console.log('Iniciando Express.js')
app.listen(port, () => {
  console.log(`Server listening on port ${chalk.green(`${port}`)}`)
})