wordCloud.resultTopics = [];
console.log("test");
window.onload = function() {
   wordCloud.communicationModule.get(
       wordCloud.wordCloudModule.doWordCloudAfterReceivedRespone, 
       wordCloud.communicationModule.defaultOnErrorAction); 
}

