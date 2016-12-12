'use strict';

const Promise = require('bluebird');

const storage = {};

module.exports = exports = {};

exports.createItem = function(schemaName, item) {
  if (!schemaName) return Promise.reject(new Error('expected schemaName'));
  if (!item) return Promise.reject(new Error('expected item'));

  if(!storage[schemaName]) storage[schemaName] = {};
  storage[schemaName][item.id] = item;
  return Promise.resolve(item);
};

exports.fetchItem = function(schemaName, id) {
  if(!schemaName) return Promise.reject(new Error('expected schemaName'));
  if(!id) return Promise.reject(new Error('expected id'));

  if(!storage[schemaName]) return Promise. reject(new Error('schema not found'));
  var item = storage[schemaName][id];
  if(!item) return Promise.reject(new Error('item not found'));
  return Promise.resolve(item);
};
