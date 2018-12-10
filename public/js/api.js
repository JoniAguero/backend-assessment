export class API {
  constructor () {
    this.URL_AUTH = 'http://localhost:3000',
    this.URL_API = 'http://localhost:3000/api',
    this.user = {
      username: 'test',
      password: 'test'
    }
  }
  async authenticate(role) {
    const resp = await fetch(`${this.URL_AUTH}/authenticate`, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify({...this.user, role}),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response =>{ return response});
    return resp;
  }

  async getAllClients () {
    const url = await fetch(`${this.URL_API}/clients`)
    return await url.json()
  }

  async getAllPolicies () {
    const url = await fetch(`${this.URL_API}/policies`)
    return await url.json()
  }

  async getUserByID (id) {
    const token = window.localStorage.getItem('token')
    const role = window.localStorage.getItem('role')
    const resp = await fetch(`${this.URL_API}/clients/id/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${JSON.stringify(token)}`,
          'Credentials': `${JSON.stringify(role)}`
        }
      }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => {
        if(response.undefined) {
          return M.toast({
            html: `Error authentication`,
            classes: 'rounded'
          })
        }
        return response
      });
    return resp;
  }

  async getUserByName (name) {
    const token = window.localStorage.getItem('token')
    const role = window.localStorage.getItem('role')
    const resp = await fetch(`${this.URL_API}/clients/name/${name}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${JSON.stringify(token)}`,
          'Credentials': `${JSON.stringify(role)}`
        }
      }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => {
        if (response.undefined) {
          return M.toast({
            html: `Error authentication`,
            classes: 'rounded'
          })
        }
        return response
      });
    return resp;
  }

  async getPoliciesByUserName (name) {
    const token = window.localStorage.getItem('token')
    const role = window.localStorage.getItem('role')
    const resp = await fetch(`${this.URL_API}/policies/name/${name}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${JSON.stringify(token)}`,
          'Credentials': `${JSON.stringify(role)}`
        }
      }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => {
        if (response.undefined) {
          return M.toast({
            html: `Error authentication`,
            classes: 'rounded'
          })
        }
        return response
      });
    return resp;
  }

  async getUserByPolicyID (id) {
    const token = window.localStorage.getItem('token')
    const role = window.localStorage.getItem('role')
    const resp = await fetch(`${this.URL_API}/policies/id/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${JSON.stringify(token)}`,
          'Credentials': `${JSON.stringify(role)}`
        }
      }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => {
        if (response.undefined) {
          return M.toast({
            html: `Error authentication`,
            classes: 'rounded'
          })
        }
        return response
      });
    return resp;
  }
}
