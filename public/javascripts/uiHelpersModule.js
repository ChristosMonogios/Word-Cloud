wordCloud.uiHelpersModule = (function() {  
    function createAHTMLElement(type, id, clazz) {
        var elem = document.createElement(type);
            elem.id = id;
            elem.classList.add(clazz);
            
        return elem;
    }
    
    function getHTMLElementBasedOnItsId(name) {
        return document.getElementById(name);
    }
    
    function getHTMLElementsBasedOnTheirClass(name) {
        return document.getElementsByClassName(name);
    }
    
    function applyStylingToAHTMLElement(element, styles) {
        for (var key in styles) {
            if (styles.hasOwnProperty(key)) {
                element.style[key] = styles[key]
            }
        }
    }
    
    function addElementToParentElement(child, parent) {
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