import { API } from './api.js'
import * as UI from './interface.js'

const api = new API()

api.getAllClients().then(data => {
  const clients = data.clients
  clients.forEach(element => {
    const option = document.createElement('option')
    option.value = element.id
    option.appendChild(document.createTextNode(element.name))
    UI.select_clients.appendChild(option)
  })
})

api.getAllPolicies().then(data => {
  const policies = data.policies
  policies.forEach(element => {
    const option = document.createElement('option')
    option.value = element.id
    option.appendChild(document.createTextNode(element.id))
    UI.select_policies.appendChild(option)
  })
})

UI.get_userbyid.addEventListener('click', (e) => {
  e.preventDefault()
  const clientSelected = UI.select_clients.value
  console.log(clientSelected)
  api.getUserByID(clientSelected).then(data => console.log(data))
})
UI.get_userbyname.addEventListener('click', (e) => {
  e.preventDefault()
  const index = UI.select_clients.selectedIndex
  const name = UI.select_clients[index].innerHTML
  api.getUserByName(name).then(data => console.log(data))
})
UI.get_policiesbyusername.addEventListener('click', (e) => {
  e.preventDefault()
  const index = UI.select_clients.selectedIndex
  const name = UI.select_clients[index].innerHTML
  api.getPoliciesByUserName(name).then(data => console.log(data))
})
UI.get_userbypolicyid.addEventListener('click', (e) => {
  e.preventDefault()
  const policySelected = UI.select_policies.value
  api.getUserByPolicyID(policySelected).then(data => console.log(data))
})
