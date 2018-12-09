var fetch = require('isomorphic-fetch')
var request = require('request')

const API_PATH = '/api'
const urls = [
  'http://www.mocky.io/v2/5808862710000087232b75ac',
  'http://www.mocky.io/v2/580891a4100000e8242b75c5'
]
module.exports = (app) => {
  const options = {
    uri: urls[1],
    json: true
  }
  app.get(`${API_PATH}/policies`, (req, res) => {
    request(options, function (error, response, body) {
      if (error) console.log('error:', error)
      console.log('statusCode:', response && response.statusCode)
      res.send(body)
    })
  })
  app.get(`${API_PATH}/policies/name/:name`, (req, res) => {
    const name = req.params.name
    let requests = urls.map(url => fetch(url))
    Promise.all(requests)
      .then(responses => {
        return responses
      })
      .then(responses => Promise.all(responses.map(r => r.json())))
      .then(data => {
        return data
      })
      .then(data => {
        const clients = data[0].clients // Posicion de clientes
        const policies = data[1].policies // Posicion de policies
        const client = clients.find(client => client.name === name)
        const response = policies.filter(policy => policy.clientId === client.id)
        res.send(response)
      })
  }
  )
  app.get(`${API_PATH}/policies/id/:id`, (req, res) => {
    const id = req.params.id
    let requests = urls.map(url => fetch(url))
    Promise.all(requests)
      .then(responses => {
        return responses
      })
      .then(responses => Promise.all(responses.map(r => r.json())))
      .then(data => {
        return data
      })
      .then(data => {
        const clients = data[0].clients // Posicion de clientes
        const policies = data[1].policies // Posicion de policies
        const policy = policies.find(policy => policy.id === id)
        const response = clients.find(client => client.id === policy.clientId)
        res.send(response)
      })
  })
}
