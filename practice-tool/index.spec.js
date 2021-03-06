const request = require('supertest');
const should = require('should');
const app = require('./index');

describe('/users GET', () => {
  describe('성공 시', ()=>{
    it('users 객체를 가져온다.', () => {
      request(app)
        .get('/users')
        .end((err, res) => {
          res.body.should.be.instanceOf(Array);
        });
    });

    it('id가 1인 user의 정보를 가져온다.', () => {
        request(app)
            .get('/users/1')
            .end((err, res) => {
                res.body.should.have.property('id', 1);
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

    it('id의 데이터 형태가 옳바르지 않은 경우', () => {
      request(app)
        .get('/users/one')
        .expect(400)
    })

    it('id의 데이터를 갖고있는 유저가 존재하지 않는 경우', () => {
      request(app)
        .get('/users/9990')
        .expect(404)
    })
  });
})