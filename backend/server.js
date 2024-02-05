require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const notesRoutes = require('./routes/note');
const folderRoute = require('./routes/folder');

const app = express();

const cors = require('cors');

//middleware
app.use(cors(
    {
        origin: ["note-app-server-alpha.vercel.app","localhost:3000"],
        methods: ["POST", "GET"],
        credentials: true
    }
));
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
        app.listen(process.env.PORT, () => {
            console.log('listening....')
        });
    })
    .catch((error) => {
        console.log(error);
    })

module.exports = app;