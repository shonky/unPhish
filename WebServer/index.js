var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");
var requestAttackerHandlers = require("./requestAttackerHandlers");
var functions = require("./functions");

var handle = {}
handle["/"] = requestHandlers.home;
handle["/home"] = requestHandlers.home;
handle["/processlogin"] = requestHandlers.processlogin;
handle["/questions"] = requestHandlers.questions;
handle["/account"] = requestHandlers.account;
handle["/attackerserver"] = requestAttackerHandlers.attackerserver;
handle["/steallogin"] = requestAttackerHandlers.steallogin;
handle["/loadQuestions"] = functions.loadQuestions; // SOMETHING WRONG

server.start(router.route, handle);
