'use strict';

const request = require('superagent');
const expect = require('chai').expect;

require('../server.js');

describe('testing note rotues', function(){
  var song = null;

  describe('testing POST /api/song', function(){
    it('should return a song', function(done){
      request.post('localhost:3000/api/song')
      .send({title: 'stuff', artist: 'tay'})
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.title).to.equal('stuff');
        expect(res.body.artist).to.equal('tay');
        song = res.body;
        done();
      });
    });
  });

  describe('testing GET /api/song', function(){
    it('should return a song', function(done){
      request.get(`localhost:3000/api/song?id=${song.id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.title).to.equal('stuff');
        expect(res.body.artist).to.equal('tay');
        done();
      });
    });
  });
});
