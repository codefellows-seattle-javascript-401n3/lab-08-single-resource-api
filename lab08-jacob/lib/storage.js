const Promise = require('bluebird');
let fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
//don't forget to install bluebird

exports.createItem = function(schemaName, item) {
  if (!schemaName) return Promise.reject(new Error('expected schema name'));
  if (!item) return Promise.reject(new Error('expected item'));
  let json = JSON.stringify(item);
  return fs.writeFileProm(`${__dirname}/../data/${schemaName}/${item.id}.json`, json)
  .then(() => item) //not sure I know what this exactly does.
  .catch(err => Promise.reject(err));
};

exports.fetchItem = function(schemaName, id) {
  if (!schemaName) return Promise.reject(new Error('expected schema name'));
  if (!id) return Promise.reject(new Error('expected id'));

  return fs.readFileProm(`${__dirname}/../data/${schemaName}/${id}.json`)
  .then(data => {
    try {
      let item = JSON.parse(data.toString());
      return item;
    } catch (err) {
      return Promise.reject(err);
    }
  })
  .catch(err => Promise.reject(err));
};
