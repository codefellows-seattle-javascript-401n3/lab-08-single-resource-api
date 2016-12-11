'use strict'

const responseHandler = require('./responseHandler')

module.exports = (router, storage) => {

  // router expects 3 different things: verb, route, and callback
  // one callback per verb/route combo
  router.get('./dogs', function(req, res) {
    storage.fetchItem(item) // does this return JSON?
      .then(data => {
        responseHandler(null, 'JSON', data)
      })
      .catch(err => {
        responseHandler(err)
      })
  })
  router.post('./dogs', function(req, res) {
    storage.postItem(item)
      .then(data => {
        responseHandler(null, 'JSON', data)
      })
      .catch(err => {
        responseHandler(err)
      })
  })
  router.put('./dogs', function(req, res) {
    storage.putItem(item)
      .then(data => {
        responseHandler(null, 'JSON', data)
      })
      .catch(err => {
        responseHandler(err)
      })
  })
  router.delete('./dogs', function(req, res) {
    storage.deleteItem(item)
      .then(data => {
        responseHandler(null, 'JSON', data)
      })
      .catch(err => {
        responseHandler(err)
      })
  })
}
