
var options = require("./redgate_config").evaluator,
    cube = require("../"),
    server = cube.server(options);

server.register = function(db, endpoints) {
  cube.evaluator.register(db, endpoints);
};

server.start();