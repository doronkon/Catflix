const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const Movie = require('./movie');

const schema = mongoose.Schema;
const Category = new schema({
    name: {
        type: String,
        required: true
    },
    movies: [
        {
            type: ObjectId,
            ref: "Movie"
        }
    ],
    promoted: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Category', Category);
