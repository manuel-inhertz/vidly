const express = require('express');
const router = express.Router();
const Joi = require('joi');
const Genre = require('../model/genres');


const schema = Joi.object().keys({
    name: Joi.string().min(3).required()
});

 router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
});

 router.get('/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id);

    if (!genre) return res.status(404).send('This genre doesn\' exist.');
    
    res.send(genre);
});

 router.post('/', async (req, res) => {
    //Validate
    const result = Joi.validate(req.body, schema);
    if (result.error !== null) return res.status(404).send(result.error);
    
    let genre = new Genre({ name: req.body.name });
    
    //Save new genre to MongoDB 
    genre = await genre.save();
    res.send(genre);
});
 router.put('/:id', async (req, res) => {
    // Validation
    const result = Joi.validate(req.body, schema);
    if (result.error !== null) return res.status(404).send(result.error);

    const genre = await Genre.findByIdAndUpdate(req.params.id, {name: req.body.name}, {new: true});

    if (!genre) return res.status(404).send('This genre doesn\' exist.');

    //Updating the genre
    res.send(genre);
});
 router.delete('/:id', async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);
    
    if (!genre) return res.status(404).send('This genre doesn\' exist.');

    res.send(genre);
});

module.exports = router;