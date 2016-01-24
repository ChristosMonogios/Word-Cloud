 wordCloud.MetaData = (function(TwoWayBind, wordCloudModule) {
        var _label = null;
        var _volume = null;
        var _positive = null;
        var _neutral = null;
        var _negative = null;
        
        function MetaData() {
            this.label = new TwoWayBind(this, "label", TwoWayBind.defaultUiCallBack);
            this.volume = new TwoWayBind(this, "volume", TwoWayBind.defaultUiCallBack);
            this.positive = new TwoWayBind(this, "positive", TwoWayBind.defaultUiCallBack);
            this.neutral = new TwoWayBind(this, "neutral", TwoWayBind.defaultUiCallBack);
            this.negative = new TwoWayBind(this, "negative", TwoWayBind.defaultUiCallBack);
        }
        
        MetaData.prototype.updateMetaInformation  = function(e) {
            var key = e.currentTarget.id;
            var result = wordCloudModule.getTopics()[key];

            this.label = result.label || "";
            this.volume = result.volume || 0;
            this.positive = result.sentiment.positive || 0;
            this.neutral = result.sentiment.neutral || 0;
            this.negative = result.sentiment.negative || 0;
        }
        
        return MetaData;
})(wordCloud.TwoWayBind, wordCloud.wordCloudModule);