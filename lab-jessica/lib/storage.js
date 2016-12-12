// * Create a storage module that will store resources by their type and id
'use strict';

const del = require('del');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});

// const storage = {};

module.exports = exports = {};

exports.createItem = function(schemaName, item) {
  // do error handling
  if (!schemaName) return Promise.reject(new Error('expected schemaName'));
  if (!item) return Promise.reject(new Error('expected item'));
  //if(!storage[schemaName]) storage[schemaName] = {};
  //storage[schemaName][item.id] = item;
  //return Promise.resolve(item);
  let json = JSON.stringify(item);
  return fs.writeFileProm(`${__dirname}/../data/${schemaName}/${item.id}.json`, json)
  .then( () => item)
  .catch( err => Promise.reject(err));
};

exports.fetchItem = function(schemaName, id) {
  if (!schemaName) return Promise.reject(new Error('expected schemaName'));
  if (!id) return Promise.reject(new Error('expected id'));

  return fs.readFileProm(`${__dirname}/../data/${schemaName}/${id}.json`)
  .then(data => {
    try {
      let item = JSON.parse(data.toString());
      return item;
    } catch (err) {
      return Promise.reject(err);
    }
  })
  .catch(err => Promise.reject(err));
};

// exports.fetchAll = function(schemaName) {
//   if (!schemaName) return Promise.reject(new Error('expected schemaName'));
//
//   fs.readdirProm(`${__dirname}/../data/${schemaName}`)
//   .then(fileArr => {
//     console.log(fileArr);
//     // return fileArr;
//     // Promise.resolve(fileArr);
//   })
//   .catch(err => Promise.reject(err));
// };

exports.deleteItem = function(schemaName, id) {
  if (!schemaName) return Promise.reject(new Error('expected schemaName'));
  if (!id) return Promise.reject(new Error('expected id'));

  if(fs.existsSync(`${__dirname}/../data/${schemaName}/${id}.json`)) {
    del([`${__dirname}/../data/${schemaName}/${id}.json`])
    .then(paths => {
      console.log('Deleted files and folders:\n', paths.join('\n'));
    })
    .catch(err => {
      console.error(err);
    });
    return;
  }
  return Promise.reject(new Error('file path does not exist'));
};
