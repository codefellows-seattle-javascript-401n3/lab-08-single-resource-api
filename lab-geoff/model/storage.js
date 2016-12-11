// create storage module that will store resources by their type and id
// create an object constructor that creates a simple resource with at least 3 properties on of which is a node-uuid id
'use strict';

let uuid = require('node-uuid');

let storage = {};

function Book(title, author) {
  this.id = uuid.v4();
  this.title = title;
  this.author = author;
}
