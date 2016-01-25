QUnit.test("Create a meta-data object and check for a setted property", function(assert) {
    var metaData = new wordCloud.MetaData();
    
    metaData.volume = 9;
            
    assert.equal(metaData.volume, 9,"MetaData object should be created.");
});