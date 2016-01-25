QUnit.test("Create a binder and subscribe an object property to it.", function(assert) {
    var testObject = {
        "testProperty": 1
    };
    var testNumber = 0;
    
    var binder = new wordCloud.Binder(testObject);
    binder.subscribe("testProperty", function() {
        testNumber += 1;
    })
    binder.publish(testObject, "testProperty");
            
    assert.equal(testNumber, 1, "The subscribed function runs and changes the value of the variable.");
});

QUnit.test("Create a two-way binding in a div-property and fire its callbacks.", function(assert) { 
    assert.expect(2);
    
    var TestObject = (function () {
        function TestObject() {
            this.testProperty = new wordCloud.TwoWayBind(this, "testProperty");
        };
        
        return TestObject;
    })();
    
    var obj = new TestObject();
    obj.testProperty = 1;
    
    assert.equal(obj.testProperty, 1, "The bound property changed its value.");
    assert.equal(document.getElementById("data-binding").innerHTML, "1", "The div-element changed its innerHTML.");
});

QUnit.test("Create a two-way binding in a input-property and fire its callbacks.", function(assert) { 
    assert.expect(2);
    
    var TestObject2 = (function () {
        function TestObject2() {
            this.testProperty2 = new wordCloud.TwoWayBind(this, "testProperty2");
        };
        
        return TestObject2;
    })();
    
    var obj = new TestObject2();
    obj.testProperty2 = 1;
    
    assert.equal(obj.testProperty2, 1, "The bound property changed its value.");
    assert.equal(document.getElementById("data-binding2").value, "1", "The input-element changed its value.");
});  