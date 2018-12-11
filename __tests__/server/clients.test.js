"use strict"
const chaiHttp = require('chai-http')
const chai = require('chai')
const faker = require('faker');
const expect = chai.expect
const config = require('../config')
const server = require('../../server/app');

chai.use(chaiHttp)
let token;
describe('Clients Routes', function () {
  const user = {
    username: faker.internet.userName(),
    password: faker.internet.password(),
    role: 'user'
  };
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
  describe('GET /clients', () => {
    it('should get status 200', (done) => {
      try {
      chai.request(config.API_URL)
        .get('/clients')
        .end(function (err, res) {
          expect(res).to.have.status(200)
          done()
        })
      } catch (error) {
        console.log(error);
      }
    })
    it('should get all clients', (done) => {
      try {
      chai.request(config.API_URL)
        .get('/clients')
        .end(function (err, res) {
          expect(res.body.clients.length).greaterThan(1)
          done()
        })
      } catch (error) {
        console.log(error);
      }
    })
    it('should get the client with id x', (done) => {
      try {
        
        chai.request(config.API_URL)
        .get('/clients/id/a0ece5db-cd14-4f21-812f-966633e7be86')
        .set('Authorization', `Bearer ${token}`)
        .end(function (err, res) {
          expect(res.body).to.have.property('id').to.be.equal('a0ece5db-cd14-4f21-812f-966633e7be86')
          expect(res).to.have.status(200)
          done()
        })
      } catch (error) {
        console.log(error);
      }
    })
    it('should get the client with name x', (done) => {
      try {
      chai.request(config.API_URL)
        .get('/clients/name/Britney')
        .set('Authorization', `Bearer ${token}`)
        .end(function (err, res) {
          expect(res.body).to.have.property('name').to.be.equal('Britney')
          expect(res).to.have.status(200)
          done()
        })
      } catch (error) {
        console.log(error);
      }
    })
  })
});
