const mongoose = require('mongoose');
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
    moviesWatched:{
        type: [String],
        default: []
    }
});

module.exports = mongoose.model('User',User);