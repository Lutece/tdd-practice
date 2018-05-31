const request = require('supertest');
const should = require('should');
const app = require('./index');

describe('/users GET', () => {
  describe('성공 시', (done)=>{
    it('users 객체를 가져온다.', () => {
      request(app)
        .get('/users')
        .end((err, res) => {
          res.body.should.be.instanceOf(Array);
          done();
        });
    });

    it('최대 limit 갯수만큼 응답한다.', (done) => {
      request(app)
        .get('/users?limit=2')
        .end((err, res) => {
          res.body.should.have.lengthOf(2);
          done();
        });
    })
  })

  describe('실패 시', (done) =>{
    it('limit이 숫자형이 아니면 400을 응답한다.', (done) => {
      request(app)
        .get('/users?limit=two')
        .expect(400)
        .end(done); 
    });
  });
})