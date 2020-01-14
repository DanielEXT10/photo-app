const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');
const uuid = require('uuid/v4');
const morgan = require('morgan');

const storage = multer.diskStorage({
    filename: (req, file, cb, filename) => {
        cb(null, uuid() + path.extname(file.originalname));
    },
    destination: 'src/public/uploads'
});

// Initializations 

const app = express();
require('./database');

// settings
app.set('port', 3000);
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');

// Middlewares

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));

const upload = multer({
    storage,
    limits:{ fileSize: 1000000}
}).single('image')

app.use(upload);
// Routes
app.use(require('./routes/index'));
// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Start server
app.listen(app.get('port'), ()=>{
    console.log(`Server on port ${app.get('port')}`);
});