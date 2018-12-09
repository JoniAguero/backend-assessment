const chaiHttp = require('chai-http');
const chai = require('chai'),
    expect = chai.expect;
const config = require('../config');

chai.use(chaiHttp);
describe('GET /clients', function () {
    it('should get status 200', (done) => {
        chai.request(config.API_URL)
            .get('/clients')
            .end(function (err, res) {
                expect(res).to.have.status(200);
                done();
            });
    });
    it('should get all clients', (done) => {
        chai.request(config.API_URL)
            .get('/clients')
            .end(function (err, res) {
                expect(res.body.clients.length).greaterThan(1);
                done();
            });
    });
    it('should get the client with id x', (done) => {
        chai.request(config.API_URL)
            .get('/clients/id/a0ece5db-cd14-4f21-812f-966633e7be86')
            .end(function (err, res) {
                expect(res.body).to.have.property('id').to.be.equal('a0ece5db-cd14-4f21-812f-966633e7be86');
                expect(res).to.have.status(200);
                done();
            });
    });
    it('should get the client with name x', (done) => {
        chai.request(config.API_URL)
            .get('/clients/name/Britney')
            .end(function (err, res) {
                expect(res.body).to.have.property('name').to.be.equal('Britney');
                expect(res).to.have.status(200);
                done();
            });
    });
});