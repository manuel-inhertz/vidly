const express = require('express');
const router = express.Router();
const Joi = require('joi');
const Movie = require('../model/movies');

//Validation schema
const schema = Joi.object().keys({
    title: Joi.string().min(5).max(50).required(),
    genreID: Joi.string().required(),
    numberInStock: Joi.number().min(0).required(),
    dailyRentalRate: Joi.number().min(0).required()
});

 router.get('/', async (req, res) => {
    const movies = await Movie.find().sort('title');
    res.send(movies);
});

 router.get('/:id', async (req, res) => {
     //find movie by given ID
    const movie = await Movie.findById(req.params.id);
    //throw error if ID is not found
    if (!movie) return res.status(404).send('This movie doesn\' exist.');
    //display result
    res.send(movie);
});

 router.post('/', async (req, res) => {
    //Validate
    const result = Joi.validate(req.body, schema);
    if (result.error !== null) return res.status(404).send(result.error);
    
    let movie = new movie({ 
        title: req.body.title,
        genre: req.body.genre,
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });
    
    //Save new movie to MongoDB 
    movie = await Movie.save();
    //display result
    res.send(movie);
});
 router.put('/:id', async (req, res) => {
    // Validation
    const result = Joi.validate(req.body, schema);
    if (result.error !== null) return res.status(404).send(result.error);
    
    //Updating the movie
    const movie = await Movie.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        genre: req.body.genre,
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    }, {
        new: true
    });

    if (!movie) return res.status(404).send('This movie doesn\' exist.');

    res.send(movie);
});
 router.delete('/:id', async (req, res) => {
    const movie = await Movie.findByIdAndRemove(req.params.id);
    
    if (!movie) return res.status(404).send('This movie doesn\' exist.');

    res.send(movie);
});

module.exports = router;