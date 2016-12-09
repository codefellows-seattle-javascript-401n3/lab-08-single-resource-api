'use strict';

let resources = {};

exports.addResource = function(resource) {
  resources[resource.id] = resource;
};

exports.deleteResource = function(resource) {
  delete resources[resource.id];
};

exports.getResource = function(id) {
  return resources[id];
};

exports.getKeys = function() {
  return Object.keys(resources);
};
