'use strict';

let bluebird = require('bluebird'); //maybe should be Promise here
let fs = bluebird.promisifyAll(require('fs'), {suffix:'Prom'});

// let storage = {}; //not sure here

exports.createItem = function(schemaName, item) {
  if(!schemaName) {
    return Promise.reject(new Error('need schemaName'));
  }
  if(!item) {
    return Promise.reject(new Error('need item'));
  }
  let json = JSON.stringify(item);
  return fs.writeFileProm('path to file', json)
    .then(() => {
      item;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

exports.fetchItem = function(schemaName, id) {
  if(!schemaName) {
    return Promise.reject(new Error('need schemaName'));
  }
  if(!id) {
    return Promise.reject(new Error('need id'));
  }
  return fs.readFileProm('path to file')
    .then(data => {
      try {
        let item = JSON.parse(data.toString());
        return item;
      } catch(err) {
        return Promise.reject(err);
      }
    })
    .catch(err => {
      return Promise.reject(err);
    });
};