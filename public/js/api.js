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
    const url = await fetch(`${this.URL_API}/clients/id/${id}`)
    return await url.json()
  }

  async getUserByName (name) {
    const url = await fetch(`${this.URL_API}/clients/name/${name}`)
    return await url.json()
  }

  async getPoliciesByUserName (name) {
    const url = await fetch(`${this.URL_API}/policies/name/${name}`)
    return await url.json()
  }

  async getUserByPolicyID (id) {
    const url = await fetch(`${this.URL_API}/policies/id/${id}`)
    return await url.json()
  }
}
