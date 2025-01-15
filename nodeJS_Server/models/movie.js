const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const Category = require('./category');
const schema = mongoose.Schema;
const Movie = new schema({
    pathToMovie:{
        type: String,
        required : true
    },
    name:{
        type: String,
        required : true
    },
    category:{
        type: ObjectId,
        ref: "Category",
        required : true
    },
    movieId:{
        type: Number
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