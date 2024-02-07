require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const notesRoutes = require('./routes/note');
const folderRoute = require('./routes/folder');

const app = express();

// Set middleware of CORS 
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://your-frontend.com"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Private-Network", true);
  //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
  res.setHeader("Access-Control-Max-Age", 7200);

  next();
});

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