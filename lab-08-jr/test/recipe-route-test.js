'use strict';

const fs = require('fs');
const expect = require('chai').expect;
const request = require('superagent');
const server = require('../server.js');
const PORT = process.env.PORT || 3000;

describe('testing recipe routes', function(){
  before('start the server', function(done) {
    server.listen(PORT, function() {
      done();
    });
  });
  describe('testing POST route', function(){
    let recipeId = null;
    after('delete recipe from test POST', function(done) {
      fs.unlink(`${__dirname}/../data/recipe/${recipeId}.json`, function() {
        done();
      });
    });
    it('should POST a recipe', function(done) {
      request.post('localhost:3000/api/recipe')
      .send({name: 'testPie', ingredients: 'testies'})
      .end((err, res) => {
        if(err) return done(err);
        expect(res.body.name).to.equal('testPie');
        expect(res.body.ingredients).to.equal('testies');
        expect(res.status).to.equal(200);
        recipeId = res.body.id;
        expect(res.body.id).to.not.equal(null);
        done();
      });
    });
  });
  describe('testing GET route', function(){
    before('set up independent test recipe file', function(done){
      fs.writeFile(`${__dirname}/../data/recipe/test.json`, JSON.stringify({name: 'test'}), function(){
        done();
      });
    });
    after('delete independent test recipe file', function(done){
      fs.unlink(`${__dirname}/../data/recipe/test.json`, function(){
        done();
      });
    });
    it('should GET a recipe', function(done){
      request.get('localhost:3000/api/recipe?id=test')
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('test');
        done();
      });
    });
    it('should respond with 404 Not Found', function(done){
      request.get('localhost:3000/api/recipe?id=1')
      .end((err, res) => {
        expect(err).to.not.equal(null);
        expect(res.status).to.equal(404);
        done();
      });
    });
    it('should respond with 400 for no ID', function(done){
      request.get('localhost:3000/api/recipe')
      .end((err, res) => {
        expect(err).to.not.equal(null);
        expect(res.status).to.equal(400);
        done();
      });
    });
  });
});
