const express = require('express');
const router = express.Router();
const Files = require('../Model/File')
const uploads  = require('../middleware/imageMiddleWare')


router.post('/upload',uploads.single('file'),async (req, res) => {
 try {

  const { stringInput, numberInput } = req.body;
  const file = req.file;


  const filepath = req.body.filepath

    const newFile = new Files({
      filepath: file.filename,
      name:stringInput,
      phone:numberInput,
    })
 
  const save = await newFile.save();
  

    res.status(200).json({newFile:true});

 } catch (error) {
  console.log({error,er:"Some thing out of the box"});
  
 }

  

  });
module.exports = router