var qs = require('querystring');

function home(response) {
		
	var loginFormat = '<html>'+
		'<head>'+
		'<meta http-equiv="Content-Type" context="text/html; '+
		'charset=UTF-8" />'+
		'</head>'+
		'<body>'+
		'<h3>Welcome to eZhi Banking</h3> '+
		'<form action="/processlogin" enctype="multipart/form-data" method="post"> '+
		'<label><label for="username">Username</label> '+
		'<input type="text" name="username"><br> '+
		'<label><label for="password">Password </label> '+
		'<input type="password" name="password"> '+
		'<input type="submit" value="signIn"> '+
		'</form> '+
		'</body> '+
		'</html> ';

		
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(loginFormat);
	response.end();
}

function processlogin(response, request) {
	
	if (request.method == 'POST') {				// Check if /processlogin accessed without using submit button
		console.log("Valid POST access");
		var procPost = '';						// Processing Post Data
		request.on('data', function(chunk) {	// Data doesn't come all at once
			procPost += chunk;
			console.log(chunk);
			if (procPost.length > 1e6)			// Check if too much POST data
				request.connection.destroy();
		});

		request.on('end', function() {
			var	loginData = qs.parse(procPost);
			console.log("loginData: " + loginData);
			var userName = loginData['username'];
			var password = loginData['password'];
			response.writeHead(200, {"Content-Type": "text/plain"});
			response.write(userName + " " + password);
			response.end();
		});
	} else {
		console.log("404 " + request.method + " to " + request.url);
		response.writeHead(404, {"Content-Type": "text/html"});
		response.write('<html><body><h2>Invalid access to url</h2></body></html>');
		response.end();
	}
}

exports.home = home;
exports.processlogin = processlogin;
