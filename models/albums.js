const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    released: {
        type: Date,
        required: true
    },
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'artist',
        required: true
    },
    songs: {
        type: Number,
        required: true
    }
});

const Album = mongoose.model('album', albumSchema);

module.exports = Album;