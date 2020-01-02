const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');
const uuidv4 = require('uuid/v4');


const storage = multer.diskStorage({
    filename: (req, file, cb)=>{
        cb(null, file.originalname);
    },
     destination: 'src/public/uploads'
});
// Initializations 

const app = express();

// settings
app.set('port', 3000);
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');

// Middlewares

app.use(multer({
    storage,
    dest: 'src/public/uploads'
}).single('image'));

// Routes
app.get('/', (req,res)=>{
 res.render('index')
});

app.post('/upload', (req,res)=>{
    console.log(req.file);
    res.send('Uploaded');
})
// Static files
app.use(express.static(path.join(__dirname, 'public')));
// Start server
app.listen(app.get('port'), ()=>{
    console.log(`Server on port ${app.get('port')}`);
});