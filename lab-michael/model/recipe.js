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
