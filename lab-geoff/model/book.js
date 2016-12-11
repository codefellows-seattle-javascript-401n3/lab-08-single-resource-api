'use strict';

let uuid = require('node-uuid');

let storage = {};

function Book(title, author) {
  this.id = uuid.v4();
  this.title = title;
  this.author = author;
}