const mongoose = require('mongoose');
const schema = mongoose.Schema;
const Movie = new schema({
    name:{
        type: String,
        required : true
    },
    category:{
        type: String,
        required : true
    },
    published:{
        type:Date,
        default:Date.now
    },
    director:{
        type: String
    },
    actors:{
        type: String,
    },
    thumbnail:{
        type: String
    },
    length:{
        type: String
    },
    description:{
        type: String
    },
    catflixOriginal:{
        type: Boolean,
        default: false
    },
    minimalAge:{
        type: String
    }
});

module.exports = mongoose.model('Movie',Movie);