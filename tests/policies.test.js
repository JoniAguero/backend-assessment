const chaiHttp = require('chai-http')
const chai = require('chai')

const expect = chai.expect
const config = require('../config')

chai.use(chaiHttp)
describe('GET /policies', function () {
  it('should get status 200', (done) => {
    chai.request(config.API_URL)
      .get('/policies')
      .end(function (err, res) {
        expect(res).to.have.status(200)
        done()
      })
  })
  it('should get all policies', (done) => {
    chai.request(config.API_URL)
      .get('/policies')
      .end(function (err, res) {
        expect(res.body.policies.length).greaterThan(1)
        done()
      })
  })
  it('should get the list of policies linked to a user name', (done) => {
    chai.request(config.API_URL)
      .get('/policies/name/Manning')
      .end(function (err, res) {
        expect(res.body).to.be.an('array')
        expect(res.body.length).greaterThan(1)
        done()
      })
  })
  it('should get the user linked to a policy number', (done) => {
    chai.request(config.API_URL)
      .get('/policies/id/64cceef9-3a01-49ae-a23b-3761b604800b')
      .end(function (err, res) {
        expect(res.body).to.be.an('object')
        done()
      })
  })
})
