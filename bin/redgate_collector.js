
var options = require("./redgate_config").collector,
    cube = require("../");
    server = cube.server(options);

server.register = function(db, endpoints) {
  cube.collector.register(db, endpoints);
};

server.start();