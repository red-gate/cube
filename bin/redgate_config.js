
module.exports = (function() {

  var getBaseConfig = function() {

    return { "mongo-host": "127.0.0.1",
             "mongo-port": 27017,
             "mongo-database": "redgate_event_cube",
             "mongo-username": null,
             "mongo-password": null };
  };
  
  var collectorConfig = getBaseConfig();
  
  collectorConfig["http-port"] = 1080;
  collectorConfig["udp-port"] = 1180;
  
  var evaluatorConfig = getBaseConfig();
  
  evaluatorConfig["http-port"] = 1081;
  
  return { collector: collectorConfig,
           evaluator: evaluatorConfig };
})();