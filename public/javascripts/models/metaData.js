 wordCloud.MetaData = (function(TwoWayBind, wordCloudModule, uiHelpersModule) {       
        function MetaData() {
            this.label = new TwoWayBind(this, "label");
            this.volume = new TwoWayBind(this, "volume");
            this.positive = new TwoWayBind(this, "positive");
            this.neutral = new TwoWayBind(this, "neutral");
            this.negative = new TwoWayBind(this, "negative");
        }
        
        MetaData.prototype.updateMetaInformation  = function(e) {
            var key = e.currentTarget.id;
            var result = wordCloudModule.getTopics()[key];
            
            if (!uiHelpersModule.checkIfAHTMLElementHasASpecificStyle("metadata", "display", "none")) {
                uiHelpersModule.setStyleInAHTMLElement("metadata", "display", "block");
                uiHelpersModule.setStyleInAHTMLElement("start-info", "display", "none");                 
            }

            this.label = result.label || "";
            this.volume = result.volume || 0;
            this.positive = result.sentiment.positive || 0;
            this.neutral = result.sentiment.neutral || 0;
            this.negative = result.sentiment.negative || 0;
        }
        
        return MetaData;
})(wordCloud.TwoWayBind, wordCloud.wordCloudModule, wordCloud.uiHelpersModule);