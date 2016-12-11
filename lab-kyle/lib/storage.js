let storage = {};

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});

module.exports = exports = {};

exports.createItem = function(schemaName, item){
  if (!schemaName) return Promise.reject(new Error('expected schema'));
  if (!item) return Promise.reject(new Error('expected item'));

  if (!storage[schemaName]) storage[schemaName] = {};
  storage[schemaName][item.id] = item;
  return Promise.resolve(item);
};

exports.fetchItem = function(schemaName, id) {
  if (!schemaName) return Promise.reject(new Error('expected schema'));
  if (!id) return Promise.reject(new Error('expected id'));

  if (!storage[schemaName]) return Promise.reject(new Error('schema does not exist'));

  return Promise.resolve(storage[schemaName][id]);
};

exports.deleteItem = function(schemaName, id) {
  if (!schemaName) return Promise.reject(new Error('expected schema'));
  if (!id) return Promise.reject(new Error('expected id'));

  if (!storage[schemaName]) return Promise.reject(new Error('schema does not exist'));

  delete storage[schemaName][id];
  return Promise.resolve();
};
