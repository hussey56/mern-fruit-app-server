const express = require('express');
const router = express.Router();
const Products = require('../Model/Products'); // model schema import
const { body, validationResult } = require('express-validator');//express validator import
const uploads  = require('../middleware/imageMiddleWare')
const mongoose = require('mongoose')
//Route 1 :for fetching user Products ::Retrieving  /api/products/getproducts

router.get('/sortproductbyprice',async(req,res)=>{
    try {
     
 
        let apiData = await Products.find().sort('-Price')
        let page = req.query.page || 1;
        let limit = 6;
        let startIndex = (page - 1) * limit;
        let endIndex = page * limit;
        let paginatedData = apiData.slice(startIndex, endIndex);
        let totalPages = Math.ceil(apiData.length / limit);

    // for mongodb built in pagainatuion function see it on thapa thechnical 15 video rest api on youtube
   
     
        res.json({total:totalPages,data:paginatedData}); 
    } catch (error) {
       res.status(404).send(error) 
    }
})




router.get('/getproducts',async(req,res)=>{
try {
    const notes = await Products.find();//fetching notes of the user id given from database
    res.json(notes); 
} catch (error) {
    console.error(error.message);
    res.status(500).send("Some error has been Occured");//through internal server error in the response
   
}


});
//Clone Route ForPagination
router.get('/getproduct',async(req,res)=>{
    try {
        const data = await Products.find();//fetching notes of the user id given from database
       const len = data.length
        let page = req.query.page || 1;
        let limit = 6;
        let startIndex = (page - 1) * limit;
        let endIndex = page * limit;
        let paginatedData = data.slice(startIndex, endIndex);
        let totalPages = Math.ceil(data.length / limit);
        res.json({data:paginatedData,totalPages,tl:len});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error has been Occured");//through internal server error in the response
       
    }
    
    
    });
//searching for product by name
router.get('/search',async(req,res)=>{
try {
    const data = await Products.find();

    const query = req.query.query;
    const results = data.filter((item )=> item.Product_name.toLowerCase().includes(query.toLowerCase()));
    res.json(results);
} catch (error) {
    console.error(error.message);
    res.status(500).send("Some error has been Occured");//through internal server error in the response
     
}
});



// Creating a product
//router 2: for adding Productsto the database  :: Creating
router.post('/addproducts',[
    body("Product_name").isLength({ min: 3 }),
    body("category").isLength({min:5}),
 body("status").isLength({min:3}),
 body("img").isLength({min:3}),
],async(req,res)=>{
    const errors = validationResult(req); 
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try { 
        const {Product_name,img,Price,status,category} = req.body;
       
const docs =  new Products({  
    Product_name,img,Price,status,category
})
const save = await docs.save();
res.json(docs);
    }catch (error) {
        console.error(error.message);
        res.status(500).send({error:"Some Internal ERROR server been Occured"});//through internal server error in the response
       
    
    }
});
// gettin single product by id
router.post('/single/:id', async (req, res) => {
    
  try {
    const id = (req.params.id).trim();
    // Convert id to ObjectId
    const objectId = await mongoose.Types.ObjectId(id);
    const sdata = await Products.findById(objectId);
    if(!sdata){
        return res.status(404).send("Product not found");
    }
res.json(sdata)
        
  } catch (error) {
    res.json({error:"some Error"})
  }
     

  
});

// delete  a product
//localhost:5000/api/products/deleteproduct/:id
router.delete('/deleteproduct/:id',async(req,res)=>{
    try {
        let id = await Products.findById(req.params.id);
        if(!id){
            return res.status(404).send("Product not found");
        } 
        id = await Products.findByIdAndDelete(req.params.id);
        res.json({"success": "Note has been Deleted"});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Internal server been Occured");//through internal server error in the response
        
    }

});
// Adding a product with multer Image
router.post('/addaproduct',uploads.single('file'),[body("Product_name").isLength({ min: 3 }),
body("Price").isLength({min:3}),
body("category").isLength({min:5}),
body("status").isLength({min:3}),],async(req,res)=>{
try {
    const { Product_name,Price,status,category } = req.body;
    const file = req.file;
    const filepath = req.body.filepath 

    const pro =  new Products({
        Product_name,img:file.filename,Price,status,category
    });

    const save = await pro.save();
    res.json(pro);
} catch (error) {
    console.log({error,er:"Some thing out of the box"});

}
});

//Update a product
router.put('/updateproduct/:id',async(req,res)=>{
   
    const {Product_name,img,Price,status,category} = req.body;
 
    let id = await Products.findById(req.params.id);
    if(!id){
        return res.status(404).send("Product not found");
    }
try {
  let newProduct = {};
  if(Product_name){ //then if title exist alter itself and make it owns title
    newProduct.Product_name = Product_name;
}
if(Price){ //then if title exist alter itself and make it owns title
    newProduct.Price = Price;
}
if(img){
    newProduct.img = img;
 
}
if(status){
    newProduct.status = status;

}
if(category){ //then if title exist alter itself and make it owns title
    newProduct.category = category;
}
 let note = await Products.findByIdAndUpdate(req.params.id,{$set:newProduct},{new:true}); //updating the existing or making it from scratch
res.json(note);
   } catch (error) {
    console.error(error.message);
    res.status(500).send("Some Internal server been Occured");//through internal server error in the response
    
}
});
router.post('/product/search',async(req,res)=>{
        try {
            const {name} = req.query //taking out the strict queries from the url to find a definite search of atleast some correct criterias
            const queryObject = {};
          
            if(name){
                queryObject.Product_name = {$regex:name , $options:"i"};//using regex for search query like %i% for you know that
            }
          
            let apiData = await Products.find(queryObject)
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

module.exports = router;