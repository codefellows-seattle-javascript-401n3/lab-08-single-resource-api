'use strict';
let del = require('del');
let mkdirp = require('mkdirp');
let Promise = require('bluebird');
let fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});

// let storage = {};
let storage = './../data/';

exports.createItem = function(schemaName, item) {
  if(!storage[schemaName]) {
    // storage[schemaName] = {};
    console.log(storage);
    console.log(schemaName);
    console.log(storage[schemaName]);
  }
  storage[schemaName][item.id] = item;
  return Promise.resolve(item);
};
exports.fetchItem = function(schemaName, id) {
  return new Promise((resolve, reject) => {
    if (!schemaName) return reject(new Error('need schemaName'));
    if (!id) return reject(new Error('need id'));
    
  });
};
exports.deleteItem = function(schemaName, id) {
  return new Promise((resolve, reject) => {
    if (!schemaName) {
      return reject(new Error('need schemaName'));
    }
    if (!id) {
      return reject(new Error('need id'));
    }
    delete storage[schemaName][id];
    resolve();
  });
};