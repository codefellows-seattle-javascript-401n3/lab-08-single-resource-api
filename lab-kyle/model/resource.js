const uuid = require('node-uuid');

const Pokemon = function(name, color) {
  this.id = uuid.v4();
  this.name = name;
  this.color = color;
};

module.exports = Pokemon;
