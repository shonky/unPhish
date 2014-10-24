var qs = require('querystring');
var mongojs= require("mongojs");
var mongoose= require('mongoose');
var mongodb= require('mongodb');
var uri= 'mongodb://shashankgolla:cnt5412@ds045970.mongolab.com:45970/unphish?authSoruce=admin'

var db=mongoose.connection;



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
			
			if (procPost.length > 1e6)			// Check if too much POST data
				request.connection.destroy();
		});

		request.on('end', function() {
			var	loginData = qs.parse(procPost);
			console.log("loginData: " + loginData);
			var userName1 = loginData['username'];
			var password1 = loginData['password'];
			response.writeHead(200, {"Content-Type": "text/plain"});
			response.write(userName1 + " " + password1);
			
			
		var seedData=[
			{
			userName: userName1,
			password: password1
			}
		];



mongodb.MongoClient.connect(uri,function(err, db){

        if(err) throw err;

        var userInfo=db.collection('userInfo');

        userInfo.insert(seedData,function(err,result){

        if(err) throw err;
        });


});


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
