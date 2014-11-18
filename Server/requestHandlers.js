var qs = require('querystring');
var fs = require('fs');
var mongodb= require('mongodb');
var uri= 'mongodb://shashankgolla:cnt5412@ds045970.mongolab.com:45970/unphish?authSoruce=admin';

var Data = function(userName, password){
				this.userName = userName;
				this.password = password;
			};


function home(response) {
	fs.readFile('./home.html', function(error,data) {
		response.end(data);
	});

}

function processlogin(response, request) {
	
	if (request.method == 'POST') {				// Check if /processlogin accessed without using submit button
		console.log("Valid POST access");
		var procPost = '';						// Processing Post Data
		request.on('data', function(chunk) {	// Data doesn't come all at once
			procPost += chunk; 
			
			if (procPost.length > 1e6)			// Check for attempted input overload 
				request.connection.destroy();
		});

		request.on('end', function() {
			var loginData = qs.parse(procPost,'\r\n','=');				// parse the incoming POST
	
			var seedData = new Data(loginData['username'],
			   						loginData['password']);				// mongo Object
			mongodb.MongoClient.connect(uri,function(err, db){
        		if(err) throw err;

        		var userInfo=db.collection('userInfo');
        		/*userInfo.insert(seedData,function(err,result){
        			if(err) throw err;
        		});*/
			console.log('ERROR RIGHT BEFORE userInfo.find call');	
				userInfo.find(seedData).count(function(err, valid){ 	// Check seedData occurs at least once in db	
					if (err) throw err;
						console.log('successful document match');	
					if(valid) {						// match
						console.log("Valid user credentials, redirecting...");
						// If match, redirect to user account
						response.statusCode = 302;
						response.setHeader("Location", "/account");
						response.end();
					} else {						// no match
						console.log("Invalid user credentials, redirecting...");
						// If no match, notify user and redirect to home page
						var button = '<html>'+
								'<body>'+
									'<script>'+
										'window.location.assign("http://localhost:8888");'+
										'confirm("Invalid username/password");'+
									'</script>'+
								'</body>'+
							'</html>';
						response.write(button);
						response.end();
					}

				});	
			});
		});
	} else {
		console.log("404 " + request.method + " to " + request.url);
		response.writeHead(404, {"Content-Type": "text/html"});
		response.write('<html><body><h2 align="center">Invalid access to url</h2></body></html>');
		response.end();
	}
}

function account(response) {
	fs.readFile('./account.html', function(error,data) {
		response.end(data);
	});
}

function questions(response, request){
	fs.readFile('./questions.html', function(error,data){
		response.end(data);
	});
}


exports.home = home;
exports.processlogin = processlogin;
exports.questions = questions;
exports.account = account;
exports.uri = uri;
