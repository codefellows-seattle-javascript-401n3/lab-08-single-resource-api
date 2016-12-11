'use strict';

require('isomorphic-fetch');
require('../index.js');

let expect = require('chai').expect;
const assert = require('assert');

describe('a restful endpoint', function() {
  it('can give a list of dogs', function(done) {
    fetch('http:/localhost:3000/dogs')
    .then(data => data.json())
    .then(data => {
      expect(res.status).to.equal(200);
      expect(res.body.dogs.length).to.equal(4);
      done();
    });
  });
});
