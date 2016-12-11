const http = require('http');
const Router = require('./lib/router');

// var resources = [];

const PORT = process.env.PORT || 3000;
const router = new Router();


require('./route/user-route.js')(router); //this is dependency injection
// const userRoute = require('./route/user-route.js')
// userRoute(router) //requiring a function and running it right away

const server = http.createServer(router.route()); //route is a function of rou


// server.on('request', function (req, res) {
//   console.log('incoming request')
//   if (req.method === 'POST' || req.method === 'PUT') {
//     parsePost(req, function() {
//       resources.push(new User(req.body));
//       res.write(JSON.stringify(resources));
//       res.end();
//     });
//   }
//   else if (req.method === 'GET') {
//     parseUrl(req); //now I have req.path and req.query
//     console.log(req.query);
//     var userArr = resources.map(function(user) {
//       var idObj = {};
//       idObj.id = user.id;
//       console.log(idObj, 'stringcheese');
//       // return idObj;
//     });
//     res.end();
//   }
// });

server.listen(PORT, function() {
  console.log('listening on port: ' + PORT);
});
