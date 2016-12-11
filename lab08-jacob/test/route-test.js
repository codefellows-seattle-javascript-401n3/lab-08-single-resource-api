//one it block per route. Do a fetch and then say it should yadda yadda
let expect = require('chai').expect;
require('fetch');
require('../index.js');

describe ('a restful endpoint', function () {
  it ('can give a list of dogs', function (done) {
    fetch('http://localhost:3000/dogs')
    .then(res => res.json())
    .then(data => {
      expect(res.status).to.equal(200);
      expect(res.body.dogs.length).to.equal(4)
      done();
    });
  });
  it('can give a list of cats', function(done) {
    //then do the same shit with cats
  })
});
