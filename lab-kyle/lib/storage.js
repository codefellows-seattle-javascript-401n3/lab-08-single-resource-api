'use strict';

let storage = {};

let path = require('path');
const mkdirp = require('mkdirp');
const del = require('del');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});

module.exports = exports = {};

exports.createItem = function(schemaName, item){
  if (!schemaName) return Promise.reject(new Error('expected schema'));
  if (!item) return Promise.reject(new Error('expected item'));
  if (!item.name && !item.color) return Promise.reject(new Error('item is not valid'));

  let json = JSON.stringify(item);
  return fs.writeFileProm(`${__dirname}/../data/${schemaName}/${item.id}.json`, json)
    .catch( err => {
      if (err.code === 'ENOENT') {
        // make the directory
        mkdirp(`${__dirname}/../data/${schemaName}`, function (err) {
          if (err) console.error(err);
          // then write to file
          fs.writeFileProm(`${__dirname}/../data/${schemaName}/${item.id}.json`, json);
        });
      } else {
        Promise.reject(err);
      }
    });
};

exports.fetchItem = function(schemaName, id) {
  if (!schemaName) return Promise.reject(new Error('expected schema'));
  if (!id) return Promise.reject(new Error('expected id'));

  return fs.readFileProm(`${__dirname}/../data/${schemaName}/${id}.json`)
    .then( data => {
      try {
        let item = JSON.parse(data.toString());
        return item;
      } catch (err){
        return Promise.reject(error);
      }
    })
    .catch( err => Promise.reject(err));
};

exports.fetchAll = function(schemaName) {
  var all = [];
  for (var key in storage[schemaName]) {
    all.push(key);
  }
  return Promise.resolve(all);
};

exports.deleteItem = function(schemaName, id) {
  if (!schemaName) return Promise.reject(new Error('expected schema'));
  if (!id) return Promise.reject(new Error('expected id'));

  // if (!storage[schemaName]) return Promise.reject(new Error('schema does not exist'));
  // delete storage[schemaName][id];

  // return Promise.resolve();
  // del.sync(['public/assets/**', '!public/assets', '!public/assets/goat.png']);
  return del([`${__dirname}/../data/${schemaName}/${id}.json`], {dryRun: true})
            .then(paths => {
              console.log('Files and folders that would be deleted:\n', paths.join('\n'));
            });
};
