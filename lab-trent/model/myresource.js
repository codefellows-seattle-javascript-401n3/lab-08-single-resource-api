'use strict';

const uuid = require('uuid');

exports.TestResource = function(name, desc) {
  this.id = uuid();
  this.name = name;
  this.desc = desc;
};
