'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const mkdirp = require('mkdirp');
// const storage = {};

module.exports = exports = {};

exports.createItem = function(schemaName, item){
  // do error handling
  if (!schemaName) return Promise.reject(new Error('expected schemaName'));
  if (!item) return Promise.reject(new Error('expect item'));
  let json = JSON.stringify(item);

  mkdirp(`${__dirname}/../data/song`, function(){
    fs.writeFileProm(`${__dirname}/../data/${schemaName}/${item.id}.json`, json)
    .then(() => item)
    .catch(err => Promise.reject(err));
  });
};


exports.fetchItem = function(schemaName, id){
  if(!schemaName) return Promise.reject(new Error('expected schemaName'));
  if(!id) return Promise.reject(new Error('expected id'));

  return fs.readFileProm(`${__dirname}/../data/${schemaName}/${id}.json`)
  .then(data => {
    try{
      let item = JSON.parse(data.toString());
      return item;
    } catch(err){
      return Promise.reject(err);
    }
  }).catch(err => Promise.reject(err));
};

exports.deleteItem = function(schemaName, id){
  if(!schemaName) return Promise.reject(new Error('schema not found'));
  if(!id) return Promise.reject(new Error('id not found'));

  return fs.unlinkProm(`${__dirname}/../data/${schemaName}/${id}.json`)
  .catch(err => Promise.reject(err));
};
