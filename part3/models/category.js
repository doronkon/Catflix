const mongoose = require('mongoose');
const schema = mongoose.Schema;
const Category = new schema({
    name:{
        type: String,
        required : true
    },
    movies:{
        type: [String],
        default: []
    },
    promoted:{
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Category',Category);