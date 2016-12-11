'use strict';

const uuid = require('node-uuid');

module.exports = function(name, content) {
  if (!name) return new Error('need a name');
  if (!content) return new Error('need info');
  if (!meanType) return new Error('need type of meal')
  this.id = uuid.v1();
  this.name = name;
  this.content = content;
  this.mealType = mealType;
};