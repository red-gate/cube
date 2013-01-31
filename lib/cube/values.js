
exports.getter = function(db) {
  return function(request, callback) {
    var start = new Date(request.start),
        stop = new Date(request.stop),
        name = request.name,
        path = request.path;

    // Validate the dates.
    if (isNaN(start)) return callback({error: "invalid start"}), -1;
    if (isNaN(stop)) return callback({error: "invalid stop"}), -1;
    
    return callback({error: "not yet implemented"}), -1;
  };
};

function handle(error) {
  if (error) throw error;
}