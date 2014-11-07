var qs = require('querystring');
var fs = require('fs');
var mongodb= require('mongodb');
var uri= 'mongodb://shashankgolla:cnt5412@ds045970.mongolab.com:45970/unphish?authSoruce=admin';


function home(response) {
		
	var loginFormat = '<html>'+
		'<head>'+
		'<meta http-equiv="Content-Type" context="text/html; '+
		'charset=UTF-8" />'+
		'</head>'+
		'<body>'+
		'<h3>Welcome to eZhi Banking</h3> '+
		'<form action="/processlogin" enctype="text/plain" '+
	   	'method="post"> '+
		'<label><label for="username">Username</label> '+
		'<input type="text" name="username"><br> '+
		'<label><label for="password">Password </label> '+
		'<input type="password" name="password"> '+
		'<input type="submit" value="Login"> '+
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
			
			if (procPost.length > 1e6)			// Check if too much POST data
				request.connection.destroy();
		});

		request.on('end', function() {
			var	loginData = qs.parse(procPost);		// qs.parse stores entire string into username
			var userName1 = loginData['username'];	// password1 is always nullc
			var password1 = loginData['password'];
			
			var Data = function(userName, password){
				this.userName = userName;
				this.password = password;
			}

			var seedData = new Data(userName1, password1);	

			console.log(seedData.userName + " " + seedData.password);
			mongodb.MongoClient.connect(uri,function(err, db){
        		if(err) throw err;

        		var userInfo=db.collection('userInfo');

        		userInfo.insert(seedData,function(err,result){
        			if(err) throw err;
        		});
				
				userInfo.find(seedData).count(function(err, valid){ 	// NOT sure if find(seedData) needs a callback
					if (err) throw err;
							
					if(valid) {						// match
						console.log("Valid user credentials, redirecting...");
						// If match, redirect to user account
						response.statusCode = 302;
						response.setHeader("Location", "/questions");
						response.end();
					} else {						// no match
						console.log("Invalid user credentials, redirecting...");
						response.statusCode = 302;
						response.setHeader("Location", "/questions");
						response.end();
					}
				});	
			});
		});
	} else {
		console.log("404 " + request.method + " to " + request.url);
		response.writeHead(404, {"Content-Type": "text/html"});
		response.write('<html><body><h2>Invalid access to url</h2></body></html>');
		response.end();
	}
}

function account(response) {		// If we can get DB to work, pass request to hold user id
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
