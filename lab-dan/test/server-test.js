// const fetch = require('fetch')
const expect = require('chai').expect
const chai = require('chai')
const chaiHttp = require('chai-http')

chai.use(chaiHttp)

const app = require('../index.js')

describe('this is a basic test that my server spins up', function() {
  let testID = ''

  it('should be up and running after the start function is called', function () {
    expect(app.listening).to.be.true
  })

  it('should get a 200 response with a correct object for a GET request to \'/\'', function(done) {
    chai.request(app)
      .get('/')
      .end(function(err, res) {
        expect(res).to.have.status(200)
        expect(res).to.be.text
        expect(res.text).to.be.equal('Hello, world! This is the amazing dogs api\n')
        done()
      })
  })

  it('should get a 404 response with \'not found\' for a GET request to \'/dogs?id=nonexistentid\'', function(done) {
    chai.request(app)
      .get('/dogs?id=nonexistentid')
      .end(function(err, res) {
        expect(res).to.have.status(404)
        expect(res).to.be.text
        expect(res.text).to.be.equal('not found\n')
        done()
      })
  })

  it('should get a 200 response with the correct object for a GET request to \'/dogs?id=1234-test-obj\'', function(done) {
    chai.request(app)
      .get('/dogs?id=1234-test-obj')
      .end(function(err, res) {
        let data = JSON.parse(res.text)
        expect(err).to.be.null
        expect(res).to.have.status(200)
        expect(res).to.have.header('Content-Type', 'application/json')
        expect(data.name).to.be.equal('Test')
        expect(data.breed).to.be.equal('Shiba')
        done()
      })
  })

  it('should get a 201 response with a correct object for a POST request to \'/dogs\'', function(done) {
    let testName = 'POSTtest'
    let testBreed = 'POSTtest'
    chai.request(app)
      .post('/dogs')
      .send({ name: testName, breed: testBreed})
      .end(function(err, res) {
        let data = JSON.parse(res.text)
        testID = data.id
        expect(err).to.be.null
        expect(res).to.have.status(201)
        expect(res).to.have.header('Content-Type', 'application/json')
        expect(data.name).to.be.equal(testName)
        expect(data.breed).to.be.equal(testBreed)
        done()
      })
  })

  it('should properly update and return an object with a PUT request to \'/dogs\'', function(done) {
    let testName = 'PUTtest1Name'
    let testBreed = 'PUTtest1Breed'
    chai.request(app)
      .put('/dogs')
      .send({ id: testID, name: testName, breed: testBreed})
      .end(function(err, res) {
        let data = JSON.parse(res.text)
        expect(err).to.be.null
        expect(res).to.have.status(200)
        expect(res).to.have.header('Content-Type', 'application/json')
        expect(data.name).to.be.equal(testName)
        expect(data.breed).to.be.equal(testBreed)
        done()
      })
  })

  it('should properly create a new object if an ID does not exist with a PUT request to \'/dogs\'', function(done) {
    let testName = 'PUTtest2Name'
    let testBreed = 'PUTtest2Breed'
    chai.request(app)
      .put('/dogs')
      .send({ id: 'nonexistentid', name: testName, breed: testBreed})
      .end(function(err, res) {
        let data = JSON.parse(res.text)
        expect(err).to.be.null
        expect(res).to.have.status(201)
        expect(res).to.have.header('Content-Type', 'application/json')
        expect(data.name).to.be.equal(testName)
        expect(data.breed).to.be.equal(testBreed)
        done()
      })
  })


  it('should properly delete an object and return a 200 status with a DELETE request to \'/dogs\'', function(done) {
    chai.request(app)
      .del(`/dogs?id=${testID}`)
      .end(function(err, res) {
        expect(err).to.be.null
        expect(res).to.have.status(204)
        done()
      })
  })

})
