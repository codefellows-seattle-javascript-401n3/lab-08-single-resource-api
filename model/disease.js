'use strict';

const uuid = require('node-uuid');

const Disease = module.exports = function(name, symptoms) {
  this.name = name;
  this.symptoms = symptoms;
  this.id = uuid.v4();
};
