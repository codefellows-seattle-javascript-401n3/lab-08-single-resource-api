'use strict';

let storage = {};

exports.createItem = function(schemaName, item) {
  if(!storage[schemaName]) {
    storage[schemaName] = {};
  }
  storage[schemaName][item.id] = item;
  console.log(storage);
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
exports.deleteItem = function(schemaName, id) {
  return new Promise((resolve, reject) => {
    if (!schemaName) {
      return reject(new Error('need schemaName'));
    }
    if (!id) {
      return reject(new Error('need id'));
    }
    console.log(storage);
    delete storage[schemaName][id];
    console.log(storage);
    resolve();
  });
};