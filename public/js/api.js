export class API {
  constructor () {
    this.URL_API = 'http://localhost:3000/api'
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
