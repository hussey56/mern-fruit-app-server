const express = require('express');
const router = express.Router();
const Users = require('../Model/user');
const {body,validationResult} = require('express-validator');
const bcrypt = require('bcryptjs'); // import bcrypt for usage
const jwt = require('jsonwebtoken'); //importing jwt token
const JWT_SECRET = 'HSK';
const fetchUser = require('../middleware/fetchUser')//importing middleware for route 3
  
///localhost:5000/api/users/signup
router.post('/sign',[body("name").isLength({min:5}),
body("email").isEmail(),
body("password").isLength({min:3})],
async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(),success:false });
      }
      try {
        let user = await Users.findOne({email:req.body.email});
        if(user){
        return   res.status(400).json({error:"This Email already have an account linked"});
        }

        const salt = await bcrypt.genSalt(9);
        const hashp = await bcrypt.hash(req.body.password,salt);
        user = await Users.create({
            name:req.body.name,
            email:req.body.email,
            password:hashp,
            gender:req.body.gender,
            address:req.body.address,
        });
        const data = {
            user:{
                id:user.id,
            }
        }
        const AuthToken = jwt.sign(data, JWT_SECRET); // GIVIN JSON TOKEN 1ARGUMENT IS ID OF DTA COLLECTION 2aRGUMENT IS THE SIGNATURE       
        res.send({token:AuthToken});   
      } catch (error) {
       res.status(500).send("Some Server error has been occured") 
      }

});
router.post('/login',[body("email").isEmail(),body("password").exists(),],async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(),success:false });
      }
      const {email,password} = req.body;
      try {
        let user = await Users.findOne({email});
        if(!user){
            return res.status(400).json({ errors: "wrong credentials"});
 }
const comparePassword = await bcrypt.compare(password,user.password)
if(!comparePassword){
    return res.status(400).json({ errors: "wrong credentials"});
}
const data = {
    user:{
        id:user.id
    }
}
const AuthToken = jwt.sign(data,JWT_SECRET);
res.send({AuthToken});
      }catch (error) {
        res.status(500).send("Some Server error has been occured") 

      }
})
// user login data 
router.post('/userdata',fetchUser,async(req,res)=>{
    try {
       let  userId = req.user.id;
        const user = await Users.findById(userId).select('-password');
        if(!user){
            res.send(invalid);

        }
res.send(user);
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Internal error has been occured");//through internal server error in the response
        
    }
})

module.exports = router;