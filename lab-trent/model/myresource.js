'use strict';

const uuid = require('uuid');

module.exports = function(name, desc) {
  this.id = uuid();
  this.name = name;
  this.desc = desc;
};
