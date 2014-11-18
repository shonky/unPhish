var mongodb = require('mongodb');
var uri = require('./requestHandlers').uri;

function load() {
	mongodb.MongoClient.connect(uri, function(err, db){
		if (err) throw err;
		
			var faq = db.collection('faq');
			faq.find().toArray(function(err, questions){
				if (err) throw err;
/*
				if(questions.length != 0) {
				//	var p = document.createElement("P");
				//	var p2 = document.createElement("P");
					var qLabel = document.createTextNode("Question: ");			// TODO document not defined
					var aLabel = document.createTextNode("Answer: ");
					var body = document.getElementById("prevQuestions");
					for (var q in questions) {
						var p = document.createElement("P");
						var p2 = document.createElement("P");
						// Print out the questions
						p.appendChild(qLabel);
						p.appendChild(document.createTextNode(q.question));
						body.appendChild(p);
						p2.appendChild(aLabel);
						p2.appendChild(document.createTextNode(q.answer));		
						body.appendChild(p2);
					}
				}
				*/ 
			});
		});
}

exports.load = load;

