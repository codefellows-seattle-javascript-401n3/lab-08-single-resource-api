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
        expect(res.status).to.equal(200);
        book = res.body;
        done();
      });
    });
    it('should return 400 for a request with no body', function(done) {
      request.post('http://localhost:3000/books')
      .send({})
      .end((err, res) => {
        expect(res.status).to.equal(400);
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
        expect(res.status).to.equal(200);
        done();
      });
    });
    it('should return 400 for no id', function(done) {
      request.get('http://localhost:3000/books?id=')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });
    it('should return 404 for not found id', function(done) {
      request.get('http://localhost:3000/books?id=10')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
    });
    it('should return 404 for unregister routes', function(done) {
      request.get('http://localhost:3000/test')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
    });
  });
  describe('testing DELETE request', function() {
    it('should remove the book from storage', function(done) {
      request.delete(`http://localhost:3000/books?id=${book.id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(204);
        done();
      });
    });
  });
});