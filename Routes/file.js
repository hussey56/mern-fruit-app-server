const express = require('express');
const router = express.Router();
const Files = require('../Model/File')
const uploads  = require('../middleware/fileImageMiddleware')


router.post('/upload',uploads.single('file'),async (req, res) => {
 try {

  const file = req.file;


  const filepath = req.body.filepath
let filSize =file.size / 1048576
    const newFile = new Files({
      filepath: file.filename,
      file_size:filSize,
      file_type:file.mimetype
    })
 
  const save = await newFile.save();
  

    res.status(200).json({newFile:true});

 } catch (error) {
  console.log({error,er:"Some thing out of the box"});
  
 }
});
router.get('/download/:file', (req, res) => {
  try{
    const file = req.params.file;
    res.download(`media/${file}`);
  }catch(error){
    console.log({error,er:"Some thing out of the box"});

  }
  
});
router.delete('/delete/:id',async(req,res)=>{
  try {
    let id = await Files.findById(req.params.id);
    if(!id){
        return res.status(404).send("Product not found");
    } 
    id = await Files.findByIdAndDelete(req.params.id);
    res.json({success:true});
} catch (error) {
    console.error(error.message);
    res.status(500).send("Some Internal server been Occured");//through internal server error in the response
    
}
})
  router.get('/allmedia',async(req,res)=>{
      try {
          const data = await Files.find();//fetching notes of the user id given from database
          let page = req.query.page || 1;
          let limit = 6;
          let startIndex = (page - 1) * limit;
          let endIndex = page * limit;
          let paginatedData = data.slice(startIndex, endIndex);
          let totalPages = Math.ceil(data.length / limit);
          res.json({data:paginatedData,totalPages});
      } catch (error) {
          console.error(error.message);
          res.status(500).send("Some error has been Occured");//through internal server error in the response        
      }
  });
  router.get('/getfilesdata',async(req,res)=>{
    try {
        const notes = await Files.find();//fetching notes of the user id given from database
        res.json(notes); 
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error has been Occured");//through internal server error in the response
       
    }
    
    
    });
  router.post('/file/search',async(req,res)=>{
    try {
        const {name} = req.query //taking out the strict queries from the url to find a definite search of atleast some correct criterias
        const queryObject = {};
      
        if(name){
            queryObject.filepath = {$regex:name , $options:"i"};//using regex for search query like %i% for you know that
        }
      
        let apiData = await Files.find(queryObject)
        let page = req.query.page || 1;
        let limit = 6;
        let startIndex = (page - 1) * limit;
        let endIndex = page * limit;
        let paginatedData = apiData.slice(startIndex, endIndex);
        let totalPages = Math.ceil(apiData.length / limit);

    const all = await paginatedData;
    
        const len = await all.length;
        res.json({total:len,data:all,pages:totalPages}); 
    } catch (error) {
       res.status(404).send(error) 
    }
    
})

module.exports = router