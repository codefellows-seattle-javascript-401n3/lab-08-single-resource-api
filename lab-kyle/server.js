const http = require('http');

const PORT = process.env.PORT || 3000;

const server = module.exports = http.createServer(function(req, res) {

});

server.listen(PORT, function() {
  console.log('Server started');
});
