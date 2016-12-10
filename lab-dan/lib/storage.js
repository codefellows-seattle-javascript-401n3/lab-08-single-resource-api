'use strict';

const blueBird = require('bluebird');
let storage = {};
let fs = blueBird.promisifyAll(require('fs'), { suffix: 'Promised'});

// This is what a monkeyfied fs function looks like
// fs.readFilePromised('file').then()
// fs.writeFilePromised('file').then()

storage.fetchItem = function(id) {
  return fs.readFilePromised(`${__dirname}/../data/data.json`)
    .then(data => {
      data = JSON.parse(data.toString());
      return data[id];
    });
};

// to be continued
