import { expect } from 'chai'
import request from 'supertest'
const server = request(process.env.API_HOST)

describe('API /page', function () {
  it('should respond with 200 OK', function () {
    server.get('/page').expect(200);
  });

  it('should respond with ads in body', function (done) {
    this.skip();
    // TODO: Ideally connect to test db and then test the below condition

    // server.get('/page').end(function (err, res) {
    //   expect(res.body).to.have.deep.property('ads');
    //   expect(res.body).to.have.deep.property('customers');
    //   done();
    // });
  });
});

describe('API /calculate', function () {
  it('should respond with 200 OK', function () {
    server.get('/calculate').expect(200);
  });

  it('should respond with ads in body', function (done) {
    this.skip();
    // TODO: Ideally connect to test db and then test the below condition

    // server
    // .post('/calculate')
    // .send({ products: []})
    // .end(function (err, res) {
    //   expect(res.body).to.have.deep.property('amountBeforeDiscount');
    //   expect(res.body).to.have.deep.property('amountAfterDiscount');
    //   expect(res.body).to.have.deep.property('discount');
    //   done();
    // });
  });
});
