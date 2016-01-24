var mongoose = require("mongoose"),
    Topics = mongoose.model("Topic");


var dataProvider = function() {
    function getTopics(callback) {
        Topics.find().lean().exec(function (err, results) {
            if (err) {
                return console.log(err);
            }
            callback(results);
        });
    }
    
    return {
        getTopics: getTopics,
    }
}

module.exports = dataProvider;