'use strict';

let uuid = require('node-uuid');

module.exports = function (title, author) {
  if(!title) throw new Error('title needed');
  if(!author) throw new Error('author needed');
  this.id = uuid.v4();
  this.title = title;
  this.author = author;
};