'use strict';

const request = require('superagent');
const expect = require('chai').expect;

require('../server.js');

describe('testing book routes', function() {
  var book = null;

  describe('testing POST /api/books', function() {
    it('should return a book', function(done){
      request.post('localhost:3000/api/books')
      .send({title: 'CODEFELLOWS', author: 'JESSICA'})
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.title).to.equal('CODEFELLOWS');
        expect(res.body.author).to.equal('JESSICA');
        book = res.body;
        done();
      });
    });
  });

  describe('testing GET /api/books', function() {
    it('should return a book given an id', function(done){
      request.get(`localhost:3000/api/books?id=${book.id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.title).to.equal('hello');
        expect(res.body.author).to.equal('good bye');
        done();
      });
    });
  });
});
