const { Router } = require('express');
const router = Router();
const multer = require('multer');
const path = require('path');



router.get('/', (req, res) => {
    res.render('index')
});

router.get('/upload', (req, res)=>{
    res.render('upload')
});
router.post('/upload',  (req, res) => {
    console.log(req.file);
    res.send('Uploaded');
});

router.get('/image/:id', (req,res)=>{
    res.send('Profile')
});
router.get('/image/:id/delete', (req,res)=>{
    res.send('image deleted')
});

module.exports = router;