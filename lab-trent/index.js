'use strict';

const httpServer = require('./lib/httpserver');
const MyResource = require('./model/myresource');
const resourceManager = require('./lib/resourcemanager');

const PORT = process.env.PORT || 3000;

httpServer.createServer(PORT, function() {
  console.log('Server listening on port: ' + PORT);
});

httpServer.on('/', function(req, res) {
  res.out('Please use the api route.');
  res.end();
});

httpServer.get('/api/myresource', function(req, res) {
  if (req.body.query.id) {
    let resource = resourceManager.getResource(req.body.query.id);
    if (resource) {
      res.out(resource);
    } else {
      res.out('Not found.', 404);
    }
  } else {
    res.out(resourceManager.resources.keys());
  }
  res.end();
});

httpServer.post('/api/myresource', function(req, res) {
  if (req.body.name && req.body.desc) {
    let resource = new MyResource(req.body.name, req.body.desc);
    resourceManager.addResource(resource);
    res.out(resource);
  } else {
    res.out('No body provided. Please specify a name and description for the resource.', 400);
  }
  res.end();
});
