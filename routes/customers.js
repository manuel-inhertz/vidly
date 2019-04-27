const express = require('express');
const router = express.Router();
const Joi = require('joi');
const Customer = require('../model/customers');


const schema = Joi.object().keys({
    isGold: Joi.boolean().required(),
    name: Joi.string().min(3).required(),
    phone: Joi.number().min(1).max(10).required()
});

 router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
});

 router.get('/:id', async (req, res) => {
    //find by ID
    const customer = await Customer.findById(req.params.id);
    //throw error if id is not found
    if (!customer) return res.status(404).send('This Customer doesn\' exist.');
    //display result
    res.send(customer);
});

 router.post('/', async (req, res) => {
    //Validate
    const result = Joi.validate(req.body, schema);
    if (result.error !== null) return res.status(404).send(result.error);
    
    let customer = new Customer({
        isGold: req.body.isGold,
        name: req.body.name,
        phone: req.body.phone
    });
    
    //Save new Customer to MongoDB 
    customer = await Customer.save();
    res.send(customer);
});
 router.put('/:id', async (req, res) => {
    // Validation
    const result = Joi.validate(req.body, schema);
    if (result.error !== null) return res.status(404).send(result.error);

    const customer = await Customer.findByIdAndUpdate(req.params.id, {
        isGold: req.body.isGold,
        name: req.body.name,
        phone: req.body.phone
    }, {
        new: true
    });

    if (!customer) return res.status(404).send('This Customer doesn\' exist.');

    //Updating the Customer
    res.send(customer);
});
 router.delete('/:id', async (req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);
    
    if (!customer) return res.status(404).send('This Customer doesn\' exist.');

    res.send(customer);
});

module.exports = router;