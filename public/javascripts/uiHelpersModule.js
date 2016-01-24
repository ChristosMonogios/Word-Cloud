wordCloud.uiHelpersModule = (function() {  
    function createAHTMLElement(type, id, clazz) {
        if (!(typeof type == "string")) {
            throw new Error("The type has to be a string.");
        }
        
        var elem = document.createElement(type);
        elem.id = id;
        
        if (clazz instanceof Array) {
            for (var i=0; i<clazz.length; i++) {
                elem.classList.add(clazz[i]) 
            }
        } else {
            elem.classList.add(clazz); 
        }
                  
           
        return elem;
    }
    
    function getHTMLElementBasedOnItsId(id) {
        return document.getElementById(id);
    }
    
    function getHTMLElementsBasedOnTheirClass(clazz) {
        return document.getElementsByClassName(clazz);
    }
    
    function applyStylingToAHTMLElement(element, styles) {
        if (!(element && element.nodeType)) {
            throw new Error("Please provide a valid HTML element");
        }
        
        if (typeof styles != "object") {
            throw new Error("Please provide valid CSS-styles");            
        }
        
        for (var key in styles) {
            if (styles.hasOwnProperty(key)) {
                element.style[key] = styles[key]
            }
        }
    }
    
    function addElementToParentElement(child, parent) {
        if (!(child && child.nodeType) || !(parent && parent.nodeType)) {
            throw new Error("Please provide valid HTML elements");
        }
        
        parent.appendChild(child);
    }
    
    return {
        createAHTMLElement: createAHTMLElement,
        getHTMLElementBasedOnItsId: getHTMLElementBasedOnItsId,
        getHTMLElementsBasedOnTheirClass: getHTMLElementsBasedOnTheirClass,
        applyStylingToAHTMLElement: applyStylingToAHTMLElement,
        addElementToParentElement: addElementToParentElement
    }
})();