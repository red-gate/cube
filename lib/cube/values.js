
(function() {

  var createFilter = function(request) {

    var filter = {};
    
    if ("start" in request || "stop" in request) filter.t = {};
    
    if ("start" in request) filter.t.$gte = new Date(request.start);
    if ("stop" in request) filter.t.$lte = new Date(request.stop);
    
    if ("where" in request) {

      if (typeof request.where === "string") request.where = [request.where];

      for (var index = 0; index < request.where.length; ++index) {

        var parts = request.where[index].split(':');

        if (parts.length !== 2) throw {

          message: "Bad where: " + request.where[index],
          statusCode: 400
        }

        filter['d.' + parts[0]] = parts[1];
      }
    }

    return filter;
  };

  exports.getter = function(db) {
    return function(request, callback) {

      var collection = db.collection(request.type + '_events');
      
      try {

        collection.distinct('d.' + request.path, createFilter(request), function(error, vals) {

          if (error) callback(error, 500);
          else callback(vals.sort(), 200);
        });
      }
      catch (exception) { callback(exception.message, exception.statusCode); }
    };
  };

  exports.maxGetter = function(db) {
    return function(request, callback) {
    
      var collection = db.collection(request.type + '_events');   

      var options = { limit: 1, sort: {}, fields: ['d.' + request.path] };

      options.sort['d.' + request.path] = -1;
      
     try {

        collection.findOne(createFilter(request), options, function(error, doc) {

          if (error) callback(error, 500)
          else if (!doc) callback(doc, 200)
          else callback(doc.d, 200);
        });
      }
      catch (exception) { callback(exception.message, exception.statusCode); }
    };
  };

})();
