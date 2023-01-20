const express = require('express');
const router = express.Router();
const Products = require('../Model/Products'); // model schema import
const { body, validationResult } = require('express-validator');//express validator import

//Route 1 :for fetching user Products ::Retrieving  /api/products/getproducts
router.get('/getproducts',async(req,res)=>{
try {
    const notes = await Products.find();//fetching notes of the user id given from database
    res.json(notes); 
} catch (error) {
    console.error(error.message);
    res.status(500).send("Some error has been Occured");//through internal server error in the response
   
}


});
// Creating a product
//router 2: for adding Productsto the database  :: Creating
router.post('/addproducts',[
    body("Product_name").isLength({ min: 3 }),
    body("Price").isLength({min:3}),
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

module.exports = router;