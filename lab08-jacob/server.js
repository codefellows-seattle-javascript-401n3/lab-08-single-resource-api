const http = require('http');
const parsePost = require('./lib/body-parser');
const parseUrl= require('./lib/url-parse');
const User = require('./model/resource');


var resources = [];

const PORT = process.env.PORT || 3000;

const server = http.createServer();

server.on('request', function (req, res) {
  if (req.method === 'POST') {
    parsePost(req, function() {
      resources.push(new User(req.body));
      console.log(resources);
      res.write(JSON.stringify(resources));
      res.end();
    });
  }
  else if (req.method === 'GET') {
    parseUrl(req);
    console.log(req.path);
    console.log(req.query);
    res.end();
  }
});

server.listen(PORT, function() {
  console.log('listening on port: ' + PORT);
});
