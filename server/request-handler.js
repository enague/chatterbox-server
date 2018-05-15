var fs = require('fs');

var results = [];

var headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'application/json'
};

var sendData = function(response, statusCode, data) {
  response.writeHead(statusCode, headers);
  if (data) {
    response.end(JSON.stringify(data));
  }
  response.end();
};

var actions = {
  'GET': function(request, response) {
    sendData(response, 200, {results});
  },
  'POST': function(request, response) {
    request.on('data', (chunk) => {
      results.push(JSON.parse(chunk.toString()));
      sendData(response, 201, chunk);
    });
  },
  'OPTIONS': function(request, response) {
    sendData(response, 200);
  }
};

var requestHandler = function(request, response) {
  if (actions[request.method]) {
    actions[request.method](request, response);
  }
};


  // if (request.url === '/') {
  //   var html = fs.readFileSync('./client/index.html');
    
  //   response.writeHead(200, {'Content-Type': 'text/html'});
  //   response.write(html);
  //   response.end();
  // } else if (request.url === '/styles/styles.css') {
  //   var css = fs.readFileSync('./client/styles/styles.css');

  //   response.writeHead(200, {'Content-Type': 'text/css'});
  //   response.write(css);

  //   response.end();
  // } else if (request.url === '/bower_components/underscore/underscore.js ') {
  //   var underscore = fs.readFileSync('./client/bower_components/underscore/underscore.js');

  //   response.writeHead(200, {'Content-Type': 'application/javascript'});
  //   response.write(underscore);
  //   response.end();
  // }


module.exports.requestHandler = requestHandler;