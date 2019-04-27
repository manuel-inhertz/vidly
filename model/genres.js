const mongoose = require('mongoose');

// Genre
const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    }
});

const Genre = mongoose.model('Genre', genreSchema);

module.exports = Genre;