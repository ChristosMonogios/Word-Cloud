var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var TopicSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    label: {
        type: Number,
        required: true
    },
    volume: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    sentiment: {
        negative: {
            type: Number,
            required: true            
        },        
        neutral: {
            type: Number,
            required: true           
        },        
        positive: {
            type: Number,
            required: true  
        },
    },
    sentimentScore: {
        type: Number,
        required: true
    },
    burst: {
        type: Number,
        required: true
    },
    days: [{
        date : Date,
        volume : Number
     }],
    pageType: {
        blog: Number,        
        facebook: Number,        
        forum: Number,
        general: Number,
        image: Number,
        news: Number,
        review: Number,
        twitter: Number,
        video: Number,
    },
    queries: {
        id: Number,
        name: String,
        volume: Number
    }
});


module.exports = mongoose.model("Topic", TopicSchema);