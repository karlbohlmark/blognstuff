var express = require('express');
var jade = require('jade');
var fs = require('fs');
var cs = require('coffee-script');
var mongoose = require('mongoose');
var dnode = require('dnode');
var stylus = require('stylus');

var contentTypes = fs.readdirSync(__dirname + '/content-types');

contentTypes.forEach(function(type){
  require('./content-types/' + type + '/' + type )
});

var instance = new (mongoose.model('News'))();

mongoose.connect('mongodb://localhost/samina');

var server = express.createServer();

dnode(function (client) {
    this.contentTypes = function (cb) {
      cb(mongoose.modelSchemas);
    };
}).listen(server);

function compile(str, path) {
  return stylus(str)
    .set('warn', true)
    .set('compress', true);
}

server.use(stylus.middleware({
      src: __dirname + '/public',
      force: true
}))

server.use(express.static(__dirname));
server.use(require('browserify')({
    entry : __dirname + '/js/app.coffee',
    require: ['jade', {'jquery': 'jquery-browserify'}],
    ignore: [ 'stylus', 'markdown', 'discount', 'markdown-js' ],
    watch : true
}));

var model = {
    newsitems : [
        {title: 'something happened'},
        {title: 'something could have happened'}
    ]
};

server.configure(
    function(){
        server.set('views', __dirname);
    }
)

server.get('/', function(req, res){
    res.render('./index.jade', { locals: model });
});

server.get('/content-types', function(req, res){
    res.write(JSON.stringify(mongoose.modelSchemas));
    res.end();
})

server.use(require('jade'))

server.listen(8080);
console.log('Listening on 8080...');
