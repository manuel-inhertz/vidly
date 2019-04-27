const mongoose = require('mongoose');

// customer
const customerSchema = new mongoose.Schema({
    isGold: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    phone: {
        type: Number,
        required: true,
        min: 1,
        max: 10
    }
});

const Customer = mongoose.model('customer', customerSchema);

module.exports = Customer;