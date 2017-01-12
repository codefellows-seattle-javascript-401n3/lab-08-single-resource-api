
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});

const storage = {};

exports.fetchAll = function(recipe) {
  return fs.readdirProm(`${__dirname}/../data/${recipe}/`)
  .then(data => {
    return data.map(str =>
      str.replace('.json', ''));
  });
};

exports.createItem = function(recipe, item) {
  if(!recipe) return Promise.reject(new Error('expected reciple'));
  if(!item) return Promise.reject(new Error('exptected item'));
  // if (!storage[recipe]) storage[recipe] = {};
  // storage[recipe][item.id] = item;
  // console.log(storage);
  // return Promise.resolve(item);
  let json = JSON.stringify(item);
  return fs.writeFileProm(`${__dirname}/../data/${recipe}/${item.id}.json`, json)
  .then( () => item)
  .catch( err => Promise.reject(err));

};
exports.fetchItem = function(recipe, id) {
  //console.log(storage);
  //console.log('id', id, 'recipe', recipe);4
  // console.log(recipe)
  return fs.readFileProm(`${__dirname}/../data/${recipe}/${id}.json`)
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

exports.deleteItem = function(recipe, id) {
  return new Promise((resolve,reject) => {
    if (!recipe) return reject (new Error('expected recipe'));
    if (!id) return reject (new Error('expected id'));

    recipe = storage[recipe];
    if(!recipe) return reject(new Error('recipe not found'));
    delete recipe[id];

    resolve();
  });
};
