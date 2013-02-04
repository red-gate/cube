
exports.getter = function(db) {
  return function(request, callback) {

    var collection = db.collection(request.type + '_events');
    
    var filter = {};
    
    if ("start" in request || "stop" in request) filter.t = {};
    
    if ("start" in request) filter.t.$gte = new Date(request.start);
    if ("stop" in request) filter.t.$lte = new Date(request.stop);
    
    if ("where" in request) {

      if (typeof request.where === "string") request.where = [request.where];
      
      for (var index = 0; index < request.where.length; ++index) {
        
        var parts = request.where[index].split(':');
        
        if (parts.length !== 2) return callback("Bad where: " + request.where[index], 400);
        
        filter['d.' + parts[0]] = parts[1];
      }
    }
    
    collection.distinct('d.' + request.path, filter, function(error, vals) {

      if (error) callback(error, 500);
      else callback(vals.sort(), 200);
    });
  };
};