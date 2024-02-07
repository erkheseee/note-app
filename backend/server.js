require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const notesRoutes = require('./routes/note');
const folderRoute = require('./routes/folder');

const app = express();
const port = process.env.PORT || 4000;
const cors = require('cors');

//middleware
app.use(cors({
    origin: ["http://localhost:4000", "https://note-app-ycdm.onrender.com"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
}));
app.use(express.json());
// app.use((req, res, next) => {
//     console.log(req.path, req.method);
//     next();
// })

app.get("/", (req, res) => {
    res.json({
        message: "Hello World"
    });
});

//routes
app.use('/notes/note', notesRoutes);
app.use('/notes/folder', folderRoute);

//db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to the db!");
        app.listen(port, () => {
            console.log('listening....')
        });
    })
    .catch((error) => {
        console.log(error);
    })