'use strict';

let uuid = require('node-uuid');

function Book(title, author) {
  if(!title) throw new Error('title needed');
  if(!author) throw new Error('author needed');
  this.id = uuid.v4();
  this.title = title;
  this.author = author;
}