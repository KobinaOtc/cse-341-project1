const express = require('express');
const router = require('./routes');
const PORT = process.env.PORT || 3000;

const mongodb = require('./data/database');
const app = express();

mongodb.initDb((err) => {
    if (err) {
        console.log('Unable to connect to MongoDB. Error: ', err);
        // process.exit(1);
    } else {
        app.listen(PORT, () => {
            console.log(`Database is running and node is listening on port ${PORT}`);
        });
        console.log('Connected to MongoDB.');
    }
});
app.use('/', router);
// app.listen(PORT, () => {console.log(`Running on port ${PORT}`)});