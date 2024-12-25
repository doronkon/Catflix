const mongoose = require('mongoose');
const schema = mongoose.Schema;
const User = new schema({
    name:{
        type: String,
        required : true
    },
    moviesWatched:{
        type: [String],
        default: []
    }
});

module.exports = mongoose.model('User',User);