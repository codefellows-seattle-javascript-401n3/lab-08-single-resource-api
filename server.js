'use strict';

const http = require('http');
const PORT = process.env.PORT || 3000;

const server = http.createServer(function(req, res){
  res.writeHead(200, {'Text-Content' : 'application/JSON'});
  res.write(200, JSON.stringify({msg:'default server response'}));
});

server.listen(PORT, () => {
  console.log('serving port 3000');
});
