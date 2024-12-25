const mongoose = require('mongoose');
const schema = mongoose.Schema;
const Movie = new schema({
    name:{
        type: String,
        required : true
    },
    myCategory:{
        type: String,
        required : true
    }
});

module.exports = mongoose.model('Movie',Movie);