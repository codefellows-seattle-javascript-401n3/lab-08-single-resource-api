'use strict'

const objectConstructor = require('./objectConstructor')

let storage = {}
storage.data = {
  '1234-test-obj': {
    id: '1234-test-obj',
    creationDate: Date(12/11/2016),
    name: 'Test',
    breed: 'Shiba',
  },
}

// let fs = blueBird.promisifyAll(require('fs'), { suffix: 'Promised'})

// This is what a monkeyfied fs function looks like
// fs.readFilePromised('file').then()
// fs.writeFilePromised('file').then()

storage.fetchItem = function(id) {
  // return fs.readFilePromised(`${__dirname}/../data/data.json`)
  //   .then(data => {
  //     data = JSON.parse(data.toString())
  //     return data[id]
  //   })
  if (!id) {
    return storage.fetchAll()
  } else if (typeof storage.data[id] === 'object') {
    return Promise.resolve({code: 200, data: storage.data[id]})
  }
  Promise.reject(new Error('Object does not exist'))
}

storage.fetchAll = function() {
  return Promise.resolve({code: 200, data: storage.data})
}

storage.postItem = function(obj) {
  let newItem = new objectConstructor(obj.name, obj.breed)
  storage.data[newItem.id] = newItem
  return Promise.resolve({code: 201, data: storage.data[newItem.id]})
}

storage.putItem = function(obj) {
  // as per the rules of put -- update existing object or create a new object
  if (typeof storage.data[obj.id] === 'object') {
    Object.keys(obj).forEach(key => {
      storage.data[obj.id][key] = obj[key]
    })
    return Promise.resolve({code: 200, data: storage.data[obj.id]})
  } else {
    return storage.postItem(obj)
  }
}

storage.deleteItem = function(id) {
  if(id){
    try {
      delete storage.data[id]
      return Promise.resolve({code: 200, text: 'Delete completed'})
    } catch(err) {
      return Promise.reject(err.message)
    }
  }
  return Promise.reject(new Error('Delete request not sent with id in query'))
}

module.exports = storage
