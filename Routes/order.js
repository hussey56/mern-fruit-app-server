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
        const {name,email,phone,address,payment,zip,cart,cartTotal} = req.body;
        const order = new Orders({
            name,email,phone,address,payment,zip,user_id:req.user.id,cart,cartTotal
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
module.exports = router;
