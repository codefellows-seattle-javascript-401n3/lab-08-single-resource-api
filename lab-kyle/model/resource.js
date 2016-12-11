const uuid = require('node-uuid');

const Pokemon = function(name, game) {
  this.id = uuid.v4();
  this.name = name;
  this.game = game;
};

module.exports = Pokemon;
