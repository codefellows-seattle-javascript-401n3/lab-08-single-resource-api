'use strict';

const assert = require('assert');
const http = require('http');

const PORT = process.env.PORT || 3000;

require('../index');

describe('MyResource API', function() {
  describe('Endpoints', function() {
    describe('/', function() {
      it('should tell the user to use the /api/ route', function(done) {
        http.request({ hostname: 'localhost', port: PORT, method: 'GET', path: '/' }, function(res) {
          let data = '';

          res.on('data', function(resDat) {
            data += resDat;
          });

          res.on('end', function() {
            assert.equal(data, 'Please use the /api/ route.');
            done();
          });
        });
      });
    });
  });
});
