'use strict';

const uuid = require('node-uuid');

const Book = function(title, author){
  this.id = uuid.v4();
  this.title = title;
  this.author = author;
};

module.exports = Book;
