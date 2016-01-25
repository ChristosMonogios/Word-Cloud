window.onerror = function (message, url, lineNumber, column, errorObject) {
    var alertArea = wordCloud.uiHelpersModule.getHTMLElementBasedOnItsId("alert-area");
    alert(message);
}

wordCloud.ExceptionHandling = (function() {    
    return {
    }
    
})();