'use strict';

const request = require('superagent');
const expect = require('chai').expect;

require('../server.js');
require('../model/recipe.js');

describe('testing recipe routes', function(){
  let recipe;
  describe('testing valid routes', function(){
    it('should return 404 for invalid routes', function(done){
      request.get('localhost:3000/api/klondike')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
    });
    it('should return 200 for valid route', function(done) {
      request.get('localhost:3000/api/recipe')
      .end((err, res)=> {
        expect(res.status).to.equal(200);
        // expect(res.body.name).to.equal('BEEF');
        done();
      });
    });
  });
  describe('testing /POST', function() {
    it('should post a new recipe', function(done) {
      request.post('localhost:3000/api/recipe')
      .send({name:'Meatloaf', content:'Beef, Onion, Egg, Breadcrumbs', mealType: 'Dinner'})
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('Meatloaf');
        expect(res.body.content).to.equal('Beef, Onion, Egg, Breadcrumbs');
        expect(res.body.mealType).to.equal('Dinner');
        recipe = res.body;
        done();
      });
    });
    it('should show invalid error when posting data incorrectly', function(done) {
      request.post('localhost:3000/api/recipe')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.text).to.equal('bad request');
        done();
      });
    });
  });
  describe('GET a recipe by id', function() {
    it('should look up recipe with id', function(done) {
      request.get(`localhost:3000/api/recipe?id=${recipe.id}`)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('Meatloaf');
        expect(res.body.content).to.equal('Beef, Onion, Egg, Breadcrumbs');
        expect(res.body.mealType).to.equal('Dinner');
        done();
      });
    });
    it('should show 404 when incorrect recipe id', function(done) {
      request.get('localhost:3000/api/recipe?id=987982838924')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
    });

  });


});


  //
  // describe('testing POST /api/journal', function(){
  //   it('should return a journal', function(done){
  //     request.post('localhost:3000/api/journal')
  //     .send({headline: 'hello', article: 'good bye'})
  //     .end((err, res) => {
  //       if (err) return done(err);
  //       expect(res.status).to.equal(200);
  //       expect(res.body.headline).to.equal('hello');
  //       expect(res.body.article).to.equal('good bye');
  //       journal = res.body;
  //       done();
  //     });
  //   });
  // });
  //
  // describe('testing POST /api/journal', function(){
  //   it('should return bad request for invalid body', function(done){
  //     request.post('localhost:3000/api/journal')
  //     .send({})
  //     .end((err, res) => {
  //       expect(res.status).to.equal(400);
  //       expect(res.text).to.equal('bad request');
  //       done();
  //     });
  //   });
  // });
  //
  // describe('testing GET /api/journal', function(){
  //   it('should return a journal', function(done){
  //     request.get(`localhost:3000/api/journal?id=${journal.id}`)
  //     .end((err, res) => {
  //       if (err) return done(err);
  //       expect(res.status).to.equal(200);
  //       expect(res.body.headline).to.equal('hello');
  //       expect(res.body.article).to.equal('good bye');
  //       console.log(res.body);
  //       done();
  //     });
  //   });
  // });
  //
  // describe('testing GET /api/journal', function(){
  //   it('should return bad request if no id was provided', function(done){
  //     request.get('localhost:3000/api/journal')
  //     .end((err, res) => {
  //       expect(res.status).to.equal(400);
  //       expect(err).to.equal.null;
  //       expect(res.text).to.equal('bad request');
  //       done();
  //     });
  //   });
  // });
  //
  // describe('testing GET /api/journal', function(){
  //   it('should return not found if id is not valid', function(done){
  //     request.get('localhost:3000/api/journal?id=678')
  //     .end((err, res) => {
  //       expect(res.status).to.equal(404);
  //       expect(res.text).to.equal('not found');
  //       done();
  //     });
  //   });
  // });
