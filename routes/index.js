var express = require('express'),
    router = express.Router(),
    fs = require('fs'),
    dataProvider = require("../data/dataProvider")();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* GET the topics of a specific user */
router.get('/topics', function(req, res, next) {

    // Option 1: Return data from database
    // dataProvider.getTopics(function(topics) {
    //    res.json(topics); 
    // });
    
    
    
    // Option 2: Access the topics.json directly as json file and send it back
    fs.readFile('data/topics.json', 'utf8', function(err, data) {
        if (err) {
            return console.log(err);
        }
        var result = JSON.parse(data);
        result = result.topics;
        res.json(result);
    });
});

module.exports = router;
