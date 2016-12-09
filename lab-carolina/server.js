const http = require('http');
const url = require('url');
const queryString = require('querystring');
const PORT = process.env.PORT || 3000;
const parseBody = require('./lib/parsebody.js');

const server = http.createServer(function(req, res){

});

server.listen(PORT, function(){
  console.log('listening on port ' + PORT);
});
