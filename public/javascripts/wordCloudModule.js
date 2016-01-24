wordCloud.wordCloudModule = (function(mathModule, uiHelpersModule, MetaData) {
    var topics = [];
    
    function getTopics() {
        return topics;
    }
    
    function setTopics(value) {
        topics = mathModule.normalDistributionSorter(value, "volume");
    }
    
    function doWordCloudAfterReceivedRespone (result) {
        createARandomCloud(uiHelpersModule.getHTMLElementBasedOnItsId("wordCloud"));
        setTopics(result);
        addWordsInsideTheCloud(); 

        attachEventWhenWordIsClicked();
    }
    
    function createARandomCloud(parentElement) {
        var currentElement = null,
            currentWidth = 0,
            widthOfParent = parentElement.offsetWidth,
            arrayWithWidthsOfElements = mathModule.generateArrayWithNormalDistributedElements(widthOfParent * 10),
            arrLength = arrayWithWidthsOfElements.length;

        for (var i=0; i<arrLength; i++) {
            currentWidth = arrayWithWidthsOfElements[i];
            
            currentElement = uiHelpersModule.createAHTMLElement("div", "cloudRow" + i, "cloudRow");
            
            currentWidth = (currentWidth / parentElement.offsetWidth) * 100;
            uiHelpersModule.applyStylingToAHTMLElement(currentElement, {
                width: currentWidth + "%",
                height: "3em",
                marginLeft: (100 -currentWidth)/2 + "%"
            });
            uiHelpersModule.addElementToParentElement(currentElement, parentElement);
        }   
    }
    
    function addWordsInsideTheCloud() {
        var currentRowOfCloud = 0,
            currentWordWidth = 0,
            currentWordAsHTMLElement,
            currentRowOfCloudAsHTMLElement,
            topics = getTopics(),
            topicsLength = topics.length;

        for (var i=0; i<topicsLength; i++) {
            currentRowOfCloudAsHTMLElement = uiHelpersModule.getHTMLElementBasedOnItsId("cloudRow" + currentRowOfCloud);
            currentWordAsHTMLElement = uiHelpersModule.createAHTMLElement("div", i, 
                ["word", "text-size-" + getTextSizeBasedOnPopularity(topics[i].volume || 10),
                getColorBasedOnSentimentScore(topics[i].sentimentScore || 50)]);
                        
            currentWordAsHTMLElement.innerHTML = topics[i].label || "";

            uiHelpersModule.applyStylingToAHTMLElement(currentWordAsHTMLElement, {
                marginTop: Math.floor(Math.random() * 10) + "px",
                marginBottom: Math.floor(Math.random() * 10) + "px",
                marginLeft: Math.floor(Math.random() * 30) + 1 + "px",
                marginRight: Math.floor(Math.random() * 30) + 1 + "px"
            });

            currentRowOfCloudAsHTMLElement.appendChild(currentWordAsHTMLElement);
            
            currentWordWidth += currentWordAsHTMLElement.offsetWidth +
                parseInt(currentWordAsHTMLElement.style.marginLeft) +
                parseInt(currentWordAsHTMLElement.style.marginRight);
            
            if (currentRowOfCloudAsHTMLElement.offsetWidth < currentWordWidth) {
                currentRowOfCloudAsHTMLElement.removeChild(currentWordAsHTMLElement);
                currentWordWidth = 0;
                currentRowOfCloud++;
                i--;
            }      
        }        
    }
    
    function attachEventWhenWordIsClicked() {
        var words = uiHelpersModule.getHTMLElementsBasedOnTheirClass("word");
        var metaData = new wordCloud.MetaData();
        
        for (var i=0; i<words.length; i++) {
            words[i].addEventListener("click", metaData.updateMetaInformation.bind(metaData), false);
        }        
    }

    function getTextSizeBasedOnPopularity(volume) {
        if (volume < 0) {
            throw Error("Volume cannot be negative.");
        }
        
        var lvl = 1;
        
        if (volume >= 0 && volume <= 5) {
        } else if (volume > 5 && volume <= 15) {
            lvl = 2;
        } else if (volume > 15 && volume <= 25) {
            lvl = 3;
        } else if (volume > 25 && volume <= 50) {
            lvl = 4;
        } else if (volume > 50 && volume <= 100) {
            lvl = 5;
        } else {
            lvl = 6;
        }
        
        return lvl;
    }
    
    function getColorBasedOnSentimentScore(score) {
        var color = "";
        
        if (score < 40) {
            color = "red";
        } else if (score > 60) {
            color = "green";
        } else {
            color = "gray";
        }
        
        return color;
    }
    
    return {
        getTopics: getTopics,
        setTopics: setTopics,
        createARandomCloud: createARandomCloud,
        addWordsInsideTheCloud: addWordsInsideTheCloud,
        doWordCloudAfterReceivedRespone: doWordCloudAfterReceivedRespone
    }
})(wordCloud.mathModule, wordCloud.uiHelpersModule, wordCloud.MetaData);
