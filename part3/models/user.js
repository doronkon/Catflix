const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const Movie = require('./movie');

const schema = mongoose.Schema;
const User = new schema({
    name:{
        type: String,
        required : true
    },
    password:{
        type: String,
        required : true
    },
    email:{
        type: String,
        //required : true
    },
    image:{
        type: String
    },
    moviesWatched:[
        {
            type: ObjectId,
            ref: "Movie"
        }
    ],
    userId: {
        type: Number
    }

});

module.exports = mongoose.model('User',User);