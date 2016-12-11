let storage = {};
let blueBird = require('bluebird');
let fs = blueBird.promisifyAll(require('fs'), {suffix: 'Prom'});
//don't forget to install bluebird

fs.readFileProm('file').then; //uses bluebird to write fs in a promise wrapper

fs.writeFileProm('file').then;

storage.fetchItem = function(item) {
  return fs.readFileProm(`${__dirname}/../data/data.json`)
    .then(data => {
      let item  = JSON.parse(data.toString());
      return item;
    });
};
