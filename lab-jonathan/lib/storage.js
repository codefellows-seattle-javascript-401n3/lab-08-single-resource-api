let storage = {};
let bluebird = require('bluebird');
let fs = bluebird.promisifyAll(require('fs'), { suffix: 'Prom'});
let del = require('del');


storage.createItem = function(item){
  let json = JSON.stringify(item);
  console.log('item', item);
  console.log('json', json);
  return fs.writeFileProm(`${__dirname}/../data/${item.id}.json`, json)
    .then(() => item)
    .catch( err => bluebird.reject(err));
};

storage.fetchItem = function(id){
  return fs.readFileProm(`${__dirname}/../data/${id}.json`)
    .then(data => {
      try {
        let item = JSON.parse(data.toString());
        return item;
      } catch(err){
        return bluebird.reject(err);
      }
    })
    .catch(err => bluebird.reject(err));
};

storage.deleteItem = function(id){
  del([`${__dirname}/../data/${id}.json`])
  .then( paths => {
    console.log('Deleted file: ', `${id}.json`);
  })
  .catch(err => bluebird.reject(err));
};

module.exports = storage;

//update for lab09 so i can make a PR.  
