const express = require('express');
const router = express.Router();
const Messages = require('../Model/Contact');
const { body, validationResult } = require('express-validator');//express validator import

/// message send api
router.post('/send',[body("name").isLength({min:5}), // http://localhost:5000/api/contact/send
body("email").isEmail(),
body("Phone").isLength({min:9}),
body("subject").isLength({min:6}),
body("message").isLength({min:10})],async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
        const {name,email,Phone,subject,message} = req.body;
       
        const docs =  new Messages({
            name,email,Phone,subject,message
        })
        const save = await docs.save();
        res.json({docs});
        


    } catch (error) {
        console.error(error.message);
        res.status(500).send({error:"Some Internal ERROR server been Occured"});//through internal server error in the response
         
    }
});
module.exports = router;