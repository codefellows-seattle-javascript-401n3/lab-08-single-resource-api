'use strict';

module.exports = function(req) {
  return new Promise((resolve, reject) => {
    console.log('parse body called');
    if (req.method === 'POST' || req.method === 'PUT') {
      console.log('req.method was POST or PUT. Parsing body');
      let body = '';
      req.on('data', (data => {
        body += data.toString();
      }));
      req.on('end', () => {
        console.log('parse body end event occured');
        try {
          req.body = JSON.parse(body);
          resolve(req);
        } catch (err) {
          console.error(err);
          reject(err);
        }
      });
      req.on('error', err => {
        console.error(err);
        reject(err);
      });
      return;
    }
    resolve();
  });
};