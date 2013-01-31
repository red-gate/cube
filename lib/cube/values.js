
exports.getter = function(db) {
  return function(request, callback) {
  
    if (!("stop" in request)) request.stop = Date.now();
    if (!("start" in request)) request.start = 0;
  
    var start = new Date(request.start),
        stop = new Date(request.stop),
        type = request.type,
        path = request.path;
    
    var collection = db.collection(type + '_events');
    
    var filter = { t: { $gte: start, $lte: stop } };
    
    collection.distinct('d.' + path, filter, function(error, vals) {
    
      if (error) throw error;
      
      callback(vals.sort());
    });
  };
};