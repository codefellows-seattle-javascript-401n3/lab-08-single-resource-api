const uuid = require('node-uuid');

const User = module.exports = function(body) {
  this.id = 'user_' + uuid.v4();
  this.date = new Date().toLocaleString();
  this.body = body;
};
