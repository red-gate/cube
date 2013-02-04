
exports.getter = function(db) {
  return function(request, callback) {

    var collection = db.collection(request.type + '_events');
    
    var filter = { t: {} };
    
    if ("start" in request) filter.t.$gte = new Date(request.start);
    if ("stop" in request) filter.t.$lte = new Date(request.stop);
    
    collection.distinct('d.' + request.path, filter, function(error, vals) {
    
      if (error) throw error;
      
      callback(vals.sort());
    });
  };
};