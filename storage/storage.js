'use strict';
//pretend this is a DB that's wrapped in a promise function

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});

//create storage object to attach .createAll/.fetchAll
const storage = {};

exports.createItem = function(recipeSchema, recipe) {
  //this looks like recipeConstructor/recipeInstanceWithUniqueID
  if(!recipeSchema) return Promise.reject(new Error('expected Schema'));
  if(!recipe) return Promise.reject(new Error('expected unique recipe'));
  const json = JSON.stringify(recipe);
  return fs.writeFileProm(`${__dirname}/../data/${recipeSchema}/${recipe.id}.json`, json)
  .then(() => recipe)
  .catch((err) => Promise.reject(err));
};

exports.fetchItem = function(recipeSchema, id) {
  if(!recipeSchema) return Promise.reject(new Error('expected Schema'));
  if(!id) return Promise.reject(new Error('expected unique recipe id'));
  return fs.readFileProm(`${__dirname}/../data/${recipeSchema}/${id}.json`)
  .then(data => {
    try {
      let item = JSON.parse(data.toString());
      return item;
    } catch (err) {
      return Promise.reject(err);
    }
  })
  .catch((err) => Promise.reject(err));
};
