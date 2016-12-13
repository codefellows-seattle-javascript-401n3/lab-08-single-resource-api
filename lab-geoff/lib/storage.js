'use strict';
let del = require('del');
let mkdirp = require('mkdirp');
let Promise = require('bluebird');
let fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});

// let storage = {};
let storage = '/../data/';

exports.createItem = function(schemaName, item) {
  return new Promise((resolve, reject) => {
    if (!schemaName) return reject(new Error('need schemaName'));
    if (!item) return reject(new Error('need item'));
    return fs.writeFileProm(`${__dirname}/../data/${schemaName}/${item.id}.json`, JSON.stringify(item))
    .then(() => {
      console.log(item);
    })
    .catch(err => {
      Promise.reject(err);
    });
  });
};
exports.fetchItem = function(schemaName, id) {
  return new Promise((resolve, reject) => {
    if (!schemaName) return reject(new Error('need schemaName'));
    if (!id) return reject(new Error('need id'));
    return fs.readFileProm(`${__dirname}/../data/${schemaName}/${id}.json`)
    .then(data => {
      let item = JSON.parse(data.toString());
      console.log(item);
      resolve(item);
    })
    .catch(err => {
      Promise.reject(err);
    });
  });
};
exports.deleteItem = function(schemaName, id) {
  return new Promise((resolve, reject) => {
    if (!schemaName) return reject(new Error('need schemaName'));
    if (!id) return reject(new Error('need id'));
    return fs.unlinkProm(`${__dirname}/../data/${schemaName}/${id}.json`)
    .then(() => {
      console.log('file deleted');
    })
    .catch(err => {
      Promise.reject(err);
    });
  });
};