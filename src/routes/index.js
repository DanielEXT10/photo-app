const { Router } = require('express');
const router = Router();
const multer = require('multer');
const path = require('path');

const Image = require('../models/image');


router.get('/', async (req, res) => {
    const images = await Image.find();
    res.render('index',{
        images
    })
    console.log
});

router.get('/upload', (req, res)=>{
    res.render('upload')
});
router.post('/upload', async (req, res) => {
    
    const image = new Image();
    image.title= req.body.title;
    image.description= req.body.description;
    image.filename = req.file.filename;
    image.path = '/uploads/' + req.file.filename;
    image.originalname = req.file.originalname;
    image.mimetype = req.file.mimetype;
    image.size= req.file.size; 

    console.log(image);
    await image.save()

    res.redirect('/');
});

router.get('/image/:id', (req,res)=>{
    res.send('Profile')
});
router.get('/image/:id/delete', (req,res)=>{
    res.send('image deleted')
});

module.exports = router;