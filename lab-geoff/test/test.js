'use strict';

let request = require('superagent');
let expect = require('chai').expect;
require('../server.js');

describe('testing the routes for book api', function() {
  let book = null;

  describe('testing POST request', function() {
    it('should add a book to storage', function(done) {
      request.post('http://localhost:3000/books')
      .send({title: 'testTitle', author: 'testAuthor'})
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.title).to.equal('testTitle');
        book = res.body;
        done();
      });
    });
  });
  describe('testing GET request', function() {
    it('should get a book from storage', function(done) {
      request.get(`http://localhost:3000/books?id=${book.id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.id).to.equal(book.id);
        done();
      });
    });
  });
  describe('testing DELETE request', function() {
    it('should remove the book from storage', function(done) {
      request.delete(`http://localhost:3000/books?id=${book.id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.id).to.equal(book.id);
        done();
      });
    });
  });
});