const express = require('express');
const router = express.Router();
const Orders = require('../Model/Order');
const { body, validationResult } = require('express-validator');//express validator import
const fetchUser = require('../middleware/fetchUser');

router.post('/giveorder',fetchUser,
[body("name").isLength({min:5}),
body("email").isEmail(),
body("phone").isLength({min:6}),
body("address").isLength({min:10}),
body("zip").isLength({min:4}),
body("cart").isArray(),

],async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
        const {name,email,phone,address,payment,zip,cart,cartTotal,payment_status} = req.body;
        const order = new Orders({
            name,email,phone,address,payment,zip,user_id:req.user.id,cart,cartTotal,payment_status
        });
        const save = await order.save();
        res.send({order,success:true});



    } catch (error) {
        console.error(error.message);
        res.status(500).send({error:"Some Internal ERROR server been Occured"});//through internal server error in the response
          
    }
});
// Fetching users Order List
router.post('/userorders',fetchUser,async(req,res)=>{
    try {
        const eorder = await Orders.find({user_id:req.user.id});
res.json(eorder);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({error:"Some Internal ERROR server been Occured"});//through internal server error in the response
          
    }

});
router.post('/getallorders',async (req,res)=>{
    try {
        
        const orders = await Orders.find();
res.json(orders);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({error:"Some Internal ERROR server been Occured"});//through internal server error in the response
          
    }   
})
router.post('/specificorder',async(req,res)=>{
  try{
    const {payment} = req.query //taking out the strict queries from the url to find a definite search of atleast some correct criterias
 
    const orders = await Orders.find({payment_status:payment});
    res.json(orders);
  }catch(error)
  {
    console.error(error.message);
    res.status(500).send({error:"Some Internal ERROR server been Occured"});//through internal server error in the response
      
  }
});
router.post('/singleorder/:id',async(req,res)=>{
try{
    const {id} = req.params
 
    const orders = await Orders.find({_id:id});
    res.json(orders);

}catch(error){
    res.status(500).send("Some Internal Server Error Has Occured")
}
});

router.put('/updateorder/:id',[body("payment_status").isLength({min:4})],async(req,res)=>{
    let id = await Orders.findById(req.params.id);
    if(!id){
        return res.status(403).send("Product not found");
    }
try{
  const newer = await  Orders.findByIdAndUpdate(req.params.id, { payment_status: req.body.payment_status }, { new: true })
         res.send(newer);
 
}catch(error){
    res.status(500).send("Some Internal Error Has been Occured.")
    console.log(error)
}
});
module.exports = router;
