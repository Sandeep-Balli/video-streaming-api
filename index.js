const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors);

const mediaRoutes = require('./routes/media');

app.use('/api/v1/media', mediaRoutes)

const mongodbURI = "mongodb://localhost:27017/videoupload";

mongoose.connect(mongodbURI, {
    useNewUrlParser: true
});

mongoose.connection.on('connected', () => {
    console.log('Connection Successful');
})

mongoose.connection.on('error', (err) => {
    console.log('Error: ', err);
})

app.listen(4000, () => {
    console.log('App running on Port 4000');
})