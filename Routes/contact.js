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
router.get('/seeallmessages',async(req,res)=>{
    try{
        let msgs = await Messages.find().sort({timestamp: -1});
        res.json(msgs)
    }catch(error){
        console.log(error);
        res.status(500).send("Some Internal Server Has Occurred")
    }

});
router.get('/unseenmessages',async(req,res)=>{
    try{
        let msgs = await Messages.find({seen:false});
        res.json(msgs)
    }catch(error){
        console.log(error);
        res.status(500).send("Some Internal Server Has Occurred")
    }
})
router.get('/getsingle/:id',async(req,res)=>{
    try{
        let {id} = req.params
        let msg = await Messages.find({_id:id});
        res.json(msg)
    }catch(error){
        res.status(500).send("Some Server Error Has bEEN oCCURED")
    }
});
router.put('/viewmsg/:id',[body("seen").isLength({min:4})],async(req,res)=>{
try{
    let id = await Messages.findById(req.params.id);
    if(!id){
        return res.status(403).send("Product not found");
    }
    const newer = await  Messages.findByIdAndUpdate(req.params.id, { seen: req.body.seen }, { new: true })
    res.send(newer);
}catch(error){
    res.status(500).send("Some Internal Server Error has been Occured")
}
});
module.exports = router;