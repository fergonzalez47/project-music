const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({

    stageName: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    birthday: {
        type: Date,
        required: true
    }
});

const Artist = mongoose.model('artist', artistSchema);

module.exports = Artist;