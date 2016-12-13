// let storage = {};
// let blueBird = require('bluebird');
// let fs = blueBird.promisifyAll(require('fs'), { suffix: 'Prom'});
//
// fs.readFileProm('file').then;
// fs.writeFileProm('file').then;
//
// storage.fetchItem = function(item) {
//   return fs.readFileProm(`${__dirname}/../data/data.json`)
//   .then(data => {
//     let item = JSON.parse(data.toString());
//     return item;
//   });
// };

const storage = {};

exports.fetchAll = function(recipe,item) {
  var allRecipes = [];
  if(storage[recipe][item.id] === {});
  console.log(item.id);
  allRecipes.push(item.id);
  return Promise.resolve(item.id);


};

exports.createItem = function(recipe, item) {
  if(!recipe) return Promise.reject(new Error('expected reciple'));
  if(!item) return Promise.reject(new Error('exptected item'));
  if (!storage[recipe]) storage[recipe] = {};
  storage[recipe][item.id] = item;
  console.log(storage);
  return Promise.resolve(item);

};
exports.fetchItem = function(recipe, id) {
  //console.log(storage);
  //console.log('id', id, 'recipe', recipe);4
  // console.log(recipe)
  return new Promise((resolve,reject) => {
    // console.log(recipe)
    console.log(id);
    if (!recipe) return reject (new Error('expected recipe'));
    if (!id) return reject (new Error('expected id'));

    recipe = storage[recipe];
    if(!recipe) return reject(new Error('recipe not found'));
    var item = recipe[id];
    if(!item) return reject(new Error('item not found'));
    resolve(item);
  });
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

