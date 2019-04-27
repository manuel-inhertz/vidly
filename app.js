const express = require('express');
const app = express();
const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customers');

mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log('Succesfully connected to MongoDB..'))
    .catch(err => console.error(err.message));

app.use(express.json());

app.use('/api/genres', genres);
app.use('/api/customers', customers);

app.get('/', (req, res) => {
    res.send('Welcome to Vidly');
});

app.listen(process.env.PORT || 3000, () => console.log(`Server running on port ${process.env.PORT || 3000}...`));