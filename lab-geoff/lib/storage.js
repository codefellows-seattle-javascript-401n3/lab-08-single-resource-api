'use strict';
let Promise = require('bluebird');
let fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});

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
  if (!schemaName) return Promise.reject(new Error('need schemaName'));
  if (!id) return Promise.reject(new Error('need id'));
  return fs.readFileProm(`${__dirname}/../data/${schemaName}/${id}.json`)
  .then(data => {
    let item = JSON.parse(data.toString());
    return item;
  })
  .catch(err => {
    Promise.reject(err);
  });
};
exports.deleteItem = function(schemaName, id) {
  if (!schemaName) return Promise.reject(new Error('need schemaName'));
  if (!id) return Promise.reject(new Error('need id'));
  return fs.unlinkProm(`${__dirname}/../data/${schemaName}/${id}.json`)
  .then(() => {
    console.log('file deleted');
  })
  .catch(err => {
    Promise.reject(err);
  });
};