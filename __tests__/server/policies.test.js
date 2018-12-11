const chaiHttp = require('chai-http')
const chai = require('chai')

const expect = chai.expect
const config = require('../config')
const server = require('../../server/app');

chai.use(chaiHttp)
let token;
describe('Policies Routes', function () {
  const admin = {
    username: 'test',
    password: 'test',
    role: 'admin'
  };
  before(async () => {
    try {
      const result = await chai
        .request(server)
        .post('/authenticate')
        .send(admin);
      expect(result.status).to.equal(200);
      token = result.body.token;
    } catch (error) {
      console.log(error);
    }
  });
  describe('GET /policies', function () {
    it('should get status 200', (done) => {
      try {
      chai.request(config.API_URL)
        .get('/policies')
        .end(function (err, res) {
          expect(res).to.have.status(200)
          done()
        })
      } catch (error) {
        console.log(error);
      }
    })
    it('should get all policies', (done) => {
      try {
      chai.request(config.API_URL)
        .get('/policies')
        .end(function (err, res) {
          expect(res.body.policies.length).greaterThan(1)
          done()
        })
      } catch (error) {
        console.log(error);
      }
    })
    xit('should get the list of policies linked to a user name', (done) => {
      try {
        chai.request(config.API_URL)
        .get('/policies/name/Manning')
        .set('Authorization', `Bearer ${token}`)
        .set('Credentials', `${admin.role}`)
        .end(function (err, res) {
          expect(res.body).to.be.an('array')
          expect(res.body.length).greaterThan(1)
          done()
        })
      } catch (error) {
        console.log(error);
      }
    })
    xit('should get the user linked to a policy number', (done) => {
      try {
        chai.request(config.API_URL)
        .get('/policies/id/64cceef9-3a01-49ae-a23b-3761b604800b')
        .set('Authorization', `Bearer ${token}`)
        .set('Credentials', `${admin.role}`)
        .end(function (err, res) {
          expect(res.body).to.be.an('object')
          done()
        })
      } catch (error) {
        console.log(error);
      }
    })
  })
});

