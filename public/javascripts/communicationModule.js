// The "contains all" object
var wordCloud = {};

wordCloud.communicationModule = (function() {
    var xmlHttp = new XMLHttpRequest();
    
    function get(onSuccess, onError) {
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState == 4) {
                if (xmlHttp.status == 200) {
                    if (onSuccess instanceof Function) {
                        onSuccess(JSON.parse(xmlHttp.responseText));                                           
                    } else {
                        console.log("do nothing with the results.");
                    }
                } else {
                    onError();
                }
            }
           
        };
        xmlHttp.open("GET", "/topics", true);
        xmlHttp.send();
    }
    
    function defaultOnErrorAction() {
        alert("An error happend while loading the results.");
    }
    
    return {
        get: get,
        defaultOnErrorAction: defaultOnErrorAction
    }
})();
