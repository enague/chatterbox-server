var results = [];

var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

var requestHandler = function(request, response) {
  console.log('Serving request type ' + request.method + ' for url ' + request.url);

  var headers = request.headers;
  var method = request.method;
  var url = request.url;

  var codes = {
    'GET': 200,
    'POST': 201,
    'OPTIONS': 200
  };

  var headers = defaultCorsHeaders;
  headers['Content-Type'] = 'application/json';
  var statusCode = codes[request.method];
  response.writeHead(statusCode, headers);

  if (request.method === 'POST' && request.url === '/classes/messages') {
    request.on('data', (chunk) => {
      results.push(JSON.parse(chunk.toString()));
      //chunk.toString because we want buffer to be English and in a string
      //since it is in a string, we use parse to access the object
    });
  } else if (request.method === 'OPTIONS' && request.url === '/classes/messages') {
    var headers = defaultCorsHeaders;
    response.writeHead(statusCode, headers);
    response.end();
  } else if (request.url !== '/classes/messages') {
    statusCode = 404;
    response.writeHead(statusCode, headers);
    response.end();
  }

  var responseBody = { headers, method, url, results };
  response.end(JSON.stringify(responseBody));
};


module.exports.requestHandler = requestHandler;