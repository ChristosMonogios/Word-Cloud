wordCloud.resultTopics = [];

window.onload = function() {
    if (window.location.pathname === "" || 
        window.location.pathname === "/") {
        wordCloud.communicationModule.get(
            wordCloud.wordCloudModule.doWordCloudAfterReceivedRespone, 
            wordCloud.communicationModule.defaultOnErrorAction);         
    }
}

