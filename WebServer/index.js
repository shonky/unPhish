var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {}
handle["/"] = requestHandlers.home;
handle["/home"] = requestHandlers.home;
handle["/processlogin"] = requestHandlers.processlogin;
handle["/questions"] = requestHandlers.questions;
handle["/account"] = requestHandlers.account;

server.start(router.route, handle);
