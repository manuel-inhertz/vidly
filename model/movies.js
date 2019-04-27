const mongoose = require('mongoose');

// Movie
const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    genre: genreSchema,
    numberInStock: {
        type: Number,
        required: true
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        max: 5
    }
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;