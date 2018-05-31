const util = require('./util');
const should = require('should');

describe('util 함수는..', () => {
  it('A + B를 더하는 함수입니다.', () => {
    const a = 1;
    const b = 2;
    const result = util(a)(b);
    result.should.be.equal(3);
  });
});