'use strict';

const uuid = require('node-uuid');

const Recipe = function(name, content, mealType) {
  if (!name) return new Error('need a name');
  if (!content) return new Error('need info');
  if (!mealType) return new Error('need type of meal');
  this.id = uuid.v1();
  this.name = name;
  this.content = content;
  this.mealType = mealType;
};
module.exports = Recipe;

// Recipe.create = (_recipe) => {
//   try {
//     let recipe = new Recipe(_recipe);
//     return storage.createItem(recipe);
//   }
//   catch(err) {
//     return Promise.reject;
//   }
// };