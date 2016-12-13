'use strict';

module.exports = function(req){
  return new Promise((resolve, reject) => {
    if(req.method === 'POST' || req.method === 'PUT'){
      //what happens if this is a PUT or POST method?
      //we're waiting for a response from the server to see if the data exists. if it does, we take it in as a stream and add it to the body using the .toString method for packets.
      var body = '';
      req.on('data', data => {
        body += data.toString();
      });
      req.on('end', () => {
        try {
          req.body = JSON.parse(body);
          resolve(req);
        } catch (err) {
          console.error(err);
          reject(err);
        }
      });

      req.on('error', (err) => {
        console.error(err);
        reject(err);
      });
      return;
    }
    resolve();
  });
};
