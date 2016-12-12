'use strict';

let storage = {};

exports.createItem = function(schemaName, item) {
  if(!storage[schemaName]) {
    storage[schemaName] = {};
  }
  storage[schemaName][item.id] = item;
  return Promise.resolve(item);
};
exports.fetchItem = function(schemaName, id) {
  return new Promise((resolve, reject) => {
    if (!schemaName) {
      return reject(new Error('need schemaName'));
    }
    if (!id) {
      return reject(new Error('need id'));
    }
    let schema = storage[schemaName];
    if (!schema) {
      return reject(new Error('no schema found'));
    }
    let item = schema[id];
    if (!item) {
      return reject(new Error('no item found'));
    }
    resolve(item);
  });
};

// let Promise = require('bluebird');
// let fs = Promise.promisifyAll(require('fs'), {suffix:'Prom'});
//
// exports.createItem = function(schemaName, item) {
//   if(!schemaName) {
//     return Promise.reject(new Error('need schemaName'));
//   }
//   if(!item) {
//     return Promise.reject(new Error('need item'));
//   }
//   let json = JSON.stringify(item);
//   return fs.writeFileProm(`${__dirname}/../data/${schemaName}/${item.id}.json`, json)
//     .then(() => {
//       item;
//     })
//     .catch((err) => {
//       return Promise.reject(err);
//     });
// };
//
// exports.fetchItem = function(schemaName, id) {
//   if(!schemaName) {
//     return Promise.reject(new Error('need schemaName'));
//   }
//   if(!id) {
//     return Promise.reject(new Error('need id'));
//   }
//   return fs.readFileProm(`${__dirname}/../data/${schemaName}/${id}.json`)
//     .then(data => {
//       try {
//         let item = JSON.parse(data.toString());
//         return item;
//       } catch(err) {
//         return Promise.reject(err);
//       }
//     })
//     .catch(err => {
//       return Promise.reject(err);
//     });
// };