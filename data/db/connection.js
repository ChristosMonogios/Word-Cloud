var mongoose = require("mongoose"),
    config = require("../../crossCutting/config");
    
mongoose.connect(config.dbUri, function(err) {
    if (err) {
        console.log("Could not connect to the local database:" + err);
    }
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("connection is opened.");
  // we're connected!
});

require("../../models/topic");