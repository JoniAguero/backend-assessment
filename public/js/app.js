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
  const clientSelected = UI.select_clients.value || null
 
  if (!clientSelected) {
    return M.toast({
      html: `Select some value of client`,
      classes: 'rounded'
    })
  }

  api.getUserByID(clientSelected)
  .then(data => {
    if(data.error) {
      return M.toast({
        html: `${data.error}`,
        classes: 'rounded'
      })
    }
    console.log(data);
  })
})
UI.get_userbyname.addEventListener('click', (e) => {
  e.preventDefault()
  const index = UI.select_clients.selectedIndex
  const name = UI.select_clients[index].innerHTML
  if (name == 'Choose Client') {
    return M.toast({
      html: `Select some value of client`,
      classes: 'rounded'
    })
  }
  api.getUserByName(name).then(data => {
    console.log(data);
    if (data.error) {
      return M.toast({
        html: `${data.error}`,
        classes: 'rounded'
      })
    }
  })
})
UI.get_policiesbyusername.addEventListener('click', (e) => {
  e.preventDefault()
  const index = UI.select_clients.selectedIndex
  const name = UI.select_clients[index].innerHTML
  if (name == 'Choose Client') {
    return M.toast({
      html: `Select some value of client`,
      classes: 'rounded'
    })
  }
  api.getPoliciesByUserName(name).then(data => {
    if (data.error) {
      return M.toast({
        html: `${data.error}`,
        classes: 'rounded'
      })
    } else if (Array.isArray(data)) {
      console.log(data);
    } else if (!data.credentials) {
      return M.toast({
        html: `${data.message}`,
        classes: 'rounded'
      })
    } 
  })
})
UI.get_userbypolicyid.addEventListener('click', (e) => {
  e.preventDefault()
  const policySelected = UI.select_policies.value || null
  if (!policySelected) {
    return M.toast({
      html: `Select some value of policy id`,
      classes: 'rounded'
    })
  }
  api.getUserByPolicyID(policySelected).then(data => {
    if (data.error) {
      return M.toast({
        html: `${data.error}`,
        classes: 'rounded'
      })
    } else if (typeof data === 'object') {
      console.log(data);
    } else if (!data.credentials) {
      return M.toast({
        html: `${data.message}`,
        classes: 'rounded'
      })
    }
  })
})
UI.user_button.addEventListener('click', (e) => {
  e.preventDefault()
  api.authenticate('user').then(data => {
    window.localStorage.setItem('username', data.username)
    window.localStorage.setItem('role', data.role)
    window.localStorage.setItem('token', data.token)
    return M.toast({
      html: `Successful Authentication: ${data.role}`,
      classes: 'rounded'
    })
  });
})
UI.admin_button.addEventListener('click', (e) => {
  e.preventDefault()
  api.authenticate('admin').then(data => {
    window.localStorage.setItem('username', data.username)
    window.localStorage.setItem('role', data.role)
    window.localStorage.setItem('token', data.token)
    return M.toast({
      html: `Successful Authentication: ${data.role}`,
      classes: 'rounded'
    })
  });
})
