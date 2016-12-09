'use strict';

const httpServer = require('./lib/httpserver');
const MyResource = require('./model/myresource');
const resourceManager = require('./lib/resourcemanager');

const PORT = process.env.PORT || 3000;

httpServer.createServer(PORT, function() {
  console.log('Server listening on port: ' + PORT);
});

httpServer.on('/', function(err, req, res) {
  if (err) console.error(err);
  res.out('Please use the api route.');
  res.end();
});

httpServer.get('/api/myresource', function(req, res) {
  if (req.url.query.id) {
    let resource = resourceManager.getResource(req.body.query.id);
    if (resource) {
      res.out(resource);
    } else {
      res.out('Not found.', 404);
    }
  } else {
    let keys = resourceManager.getKeys();
    if (keys) {
      res.out({ keys: keys });
    } else {
      res.out('No resources created yet. Post some.');
    }
  }
  res.end();
});

httpServer.post('/api/myresource', function(req, res) {
  try {
    if (req.body.name && req.body.desc) {
      let resource = new MyResource(req.body.name, req.body.desc);
      resourceManager.addResource(resource);
      res.out(resource);
    } else {
      res.out('No body provided. Please specify a name and description for the resource.', 400);
    }
  } catch(err) {
    console.error(err);
  }
  res.end();
});
