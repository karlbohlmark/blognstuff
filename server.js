var connect = require('connect');
var server = connect.createServer();

server.use(connect.static('./'));

server.listen(9797);
console.log('Listening on 9797...');
