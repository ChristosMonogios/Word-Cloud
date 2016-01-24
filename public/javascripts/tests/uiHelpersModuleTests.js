    QUnit.test("check if DOM element created correctly", function(assert) {        
        var element = wordCloud.uiHelpersModule.createAHTMLElement("div", "testID", "testClass");
        
        assert.ok(element.id === "testID", "The searched element has to be in the DOM");
    });
    
    QUnit.test("try to pass a number as element type", function(assert) {        
        raises(function() {
            wordCloud.uiHelpersModule.createAHTMLElement(1, "testID", "testClass");
        }, Error, "The type has to be a string.");
    }); 
  
    QUnit.test("create an element with multiple classes", function(assert) {
        assert.expect(2);
          
        var element = wordCloud.uiHelpersModule.createAHTMLElement("div", "testID", ["testClass1", "testClass2"]);

        assert.equal(element.classList[0], "testClass1", "The element has two classes");
        assert.equal(element.classList[1], "testClass2", "The element has two classes");
    });
    
    QUnit.test("get an element based on its ID", function(assert) {        
        var element = wordCloud.uiHelpersModule.getHTMLElementBasedOnItsId("qunit");

        assert.ok(element, "The element exists");    
    });
    
    QUnit.test("get elements based on their CSS-class", function(assert) {        
        assert.expect(2);
        
        var elements = wordCloud.uiHelpersModule.getHTMLElementsBasedOnTheirClass("result");
        console.log(elements);
        assert.ok(elements, "The element exists");
        assert.equal(elements.length, 1, "There is only one element with this CSS-class");  
    });
    
    QUnit.test("try to apply CSS-styles to an element", function(assert) {
        var element = document.getElementById("qunit");
                     
        wordCloud.uiHelpersModule.applyStylingToAHTMLElement(element, {background: "red"});

        assert.equal(element.style.background, "red", "The element should have the new background color");  
    });
  
    QUnit.test("Try to apply CSS-styles to a not valid element", function(assert) {                    
        raises(function() {
         wordCloud.uiHelpersModule.applyStylingToAHTMLElement("test", {background: "red"});
         }, Error, "The element has to be a valid HTML element.");
    });
 
    QUnit.test("Try to apply invalid CSS-styles to an HTML-element", function(assert) {                    
        var element = document.getElementById("qunit");
        
        raises(function() {
            wordCloud.uiHelpersModule.applyStylingToAHTMLElement(element, "test");
         }, Error, "The element has to be a valid HTML element.");
    });
    
    QUnit.test("Apply element to another ", function(assert) {                    
        var element = document.getElementById("qunit");
        var child = document.createElement("div");
        
        wordCloud.uiHelpersModule.addElementToParentElement(child, element);
        
        assert.equal(child.parentElement.id, "qunit", "The element should have the new background color");  
    });  

    QUnit.test("Try to apply non HTML-element to another", function(assert) {                    
        var element = document.getElementById("qunit");
        var child = "";
        
       raises(function() {
            wordCloud.uiHelpersModule.addElementToParentElement(child, element);
         }, Error, "The elements have to be valid HTML-elements.");
    });