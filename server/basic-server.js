/* Import node's http module: */
var http = require('http');
var fs = require('fs');
var handleRequest = require('./request-handler.js');

var port = 3000;
var ip = '127.0.0.1';

var setup = {
  '/classes/messages': function(request, response) {
    handleRequest.requestHandler(request, response);
  },

  '/': function(request, response) {
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(fs.readFileSync('./client/index.html'));
    response.end();
  },

  '/styles/styles.css': function(request, response) {
    response.writeHead(200, {'Content-Type': 'text/css'});
    response.write(fs.readFileSync('./client/styles/styles.css'));
    response.end();
  },

  '/scripts/app.js': function(request, response) {
    response.writeHead(200, {'Content-Type': 'application/javascript'});
    response.write(fs.readFileSync('./client/scripts/app.js'));
    response.end();
  },

  '/scripts/dynamic.js': function(request, response) {
    response.writeHead(200, {'Content-Type': 'application/javascript'});
    response.write(fs.readFileSync('./client/scripts/dynamic.js'));
    response.end();
  },

  '/bower_components/underscore/underscore.js': function(request, response) {
    response.writeHead(200, {'Content-Type': 'application/javascript'});
    response.write(fs.readFileSync('./client/bower_components/underscore/underscore-min.js'));
    response.end();
  },

  '/bower_components/DOMPurify/dist/purify.min.js': function(request, response) {
    response.writeHead(200, {'Content-Type': 'application/javascript'});
    response.write(fs.readFileSync('./client/bower_components/DOMPurify/dist/purify.min.js'));
    response.end();
  },

  '/bower_components/moment/min/moment.min.js': function(request, response) {
    response.writeHead(200, {'Content-Type': 'application/javascript'});
    response.write(fs.readFileSync('./client/bower_components/moment/min/moment.min.js'));
    response.end();
  }
};

var server = http.createServer(function(request, response) {
  console.log('Serving request type ' + request.method + ' for url ' + request.url);

  if (setup[request.url]) {
    setup[request.url](request, response);
  } else {
    response.writeHead(404, handleRequest.headers);
    response.end();
  }

});
console.log('Listening on http://' + ip + ':' + port);
server.listen(port, ip, () => {
  console.log(`Server running at http://${ip}:${port}`);
});

// To start this server, run:
//
//   node basic-server.js
//
// on the command line.
//
// To connect to the server, load http://127.0.0.1:3000 in your web
// browser.
//
// server.listen() will continue running as long as there is the
// possibility of serving more requests. To stop your server, hit
// Ctrl-C on the command line.

