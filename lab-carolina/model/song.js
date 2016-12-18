'use strict';

const uuid = require('node-uuid');

module.exports = function(title, artist){
  if (!title) throw new Error('title expected');
  if (!artist) throw new Error('artist expected');
  this.id = uuid.v1();
  this.title = title;
  this.artist = artist;
};
