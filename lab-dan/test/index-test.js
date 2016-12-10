const fetch = require('fetch');
const expect = require('chai').expect;

require('../index.js');

describe('a restful endpoint', function() {
  it('can give a list of dogs', function(done) {
    fetch('http://localhost:3000/dogs')
      .then(res => res.json())
      .then(data => {
        expect(data.status).to.equal(200);
        expect(data.body.dogs.length).to.equal(4);
        done();
      });
  });
});
