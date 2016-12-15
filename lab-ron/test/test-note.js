'use strict';

const request = require('superagent');
const expect = require('chai').expect;

require('isomorphic-fetch');
require('../server.js');

describe('testing note routes', function() {
  let note = null;

  describe('testing POST /api/note', function() {
    it('should return a note', function(done) {
      request.post('localhost:3000/api/note')
      .send({note: 'hello', content: 'good bye'})
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.note).to.equal('hello');
        expect(res.body.content).to.equal('good bye');
        note = res.body;
        done();
      });
    });
  });
  describe('testing GET /api/note', function() {
    it('should return a note', function(done) {
      request.get(`localhost:3000/api/note?id=${note.id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.note).to.equal('hello');
        expect(res.body.content).to.equal('good bye');
        done();
      });
    });
  });
  describe('testing content', function() {
    it('should return an object with this id', function(done) {
      request.get(`localhost:3000/api/note?id=${note.id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.note).to.equal('hello');
        expect(res.body.content).to.equal('good bye');
        expect(res.body.id).to.equal(`${note.id}`)
        done();
      });
    });
  });
});
