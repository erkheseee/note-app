require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const notesRoutes = require('./routes/notes');

const app = express();

//middleware
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

//routes
app.use('/notes', notesRoutes);

//db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to the db!");
        app.listen(process.env.PORT, () => {
            console.log('listening....')
        });
    })
    .catch((error) => {
        console.log(error);
    })
