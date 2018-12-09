const chaiHttp = require('chai-http');
const chai = require('chai'),
    expect = chai.expect;

chai.use(chaiHttp);
const URL = 'http://localhost:3000/api';
describe('GET /clients', function () {
    it('should get status 200', (done) => {
        chai.request(URL)
            .get('/clients')
            .end(function (err, res) {
                expect(res).to.have.status(200);
                done();
            });
    });
    it('should get all clients', (done) => {
        chai.request(URL)
            .get('/clients')
            .end(function (err, res) {
                expect(res.body.clients.length).greaterThan(1);
                done();
            });
    });
    it('should get the client with id x', (done) => {
        chai.request(URL)
            .get('/clients/id/a0ece5db-cd14-4f21-812f-966633e7be86')
            .end(function (err, res) {
                expect(res.body).to.have.property('id').to.be.equal('a0ece5db-cd14-4f21-812f-966633e7be86');
                expect(res).to.have.status(200);
                done();
            });
    });
    it('should get the client with name x', (done) => {
        chai.request(URL)
            .get('/clients/name/Britney')
            .end(function (err, res) {
                expect(res.body).to.have.property('name').to.be.equal('Britney');
                expect(res).to.have.status(200);
                done();
            });
    });
});