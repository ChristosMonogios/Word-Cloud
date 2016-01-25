QUnit.test("get topics in a normal distributed order", function(assert) {
    var topics = [{volume: 9}, {volume: 19}, {volume: 2}, {volume: 22}, {volume: 32}, {volume: 12}];
    wordCloud.wordCloudModule.setTopics(topics);

    assert.equal(topics[0].volume, 9, "The result should be normaly distributed");    
});

QUnit.test("get text size when number is given", function(assert) {
    var volume = 4;

    var textSize = wordCloud.wordCloudModule.getTextSizeBasedOnPopularity(volume);

    assert.equal(textSize, 1, "The minimum text size should be returned");    
});

QUnit.test("get text size when negative number is given", function(assert) {
    var volume = -4;
    
    raises(function() {
        wordCloud.wordCloudModule.getTextSizeBasedOnPopularity(volume);
    }, Error, "The volume has to be positive or zero.");
});

QUnit.test("get text size when string is given", function(assert) {
    var volume = "this will fail";
    
    raises(function() {
        wordCloud.wordCloudModule.getTextSizeBasedOnPopularity(volume);
    }, Error, "The volume has to be positive or zero.");
});

QUnit.test("get color based on score", function(assert) {
    var score = 40;
    
    var color = wordCloud.wordCloudModule.getColorBasedOnSentimentScore(score);

    assert.equal(color, "gray", "The color should be gray.");    
});

QUnit.test("get color based on negative score", function(assert) {
    var score = -40;
    
    var color = wordCloud.wordCloudModule.getColorBasedOnSentimentScore(score);

    assert.equal(color, "red", "The color should be red.");    
});

QUnit.test("get color based on string as score", function(assert) {
    var score = "this will fail";
    
    raises(function() {
        wordCloud.wordCloudModule.getColorBasedOnSentimentScore(score);
    }, Error, "The score has to be a number."); 
});