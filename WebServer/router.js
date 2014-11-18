var url = require('url');
var path = require('path');

function route(handle, pathname, response, request, js) {
	if(path.extname(url.parse(request.url).pathname) === '.js') {	// check if .js file
		js[pathname]();	
	} else if (typeof handle[pathname] === 'function') {
		handle[pathname](response, request);
	} else {
		console.log("No request handler found for " + pathname);
		response.writeHead(404, {"Content-Type": "text/plain"});
		response.write("404 not found");
		response.end();
	}
}

exports.route = route;
