const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');//express validator import
const Admin = require('../Model/Admin');
const bcrypt = require('bcryptjs'); // import bcrypt for usage
const jwt = require('jsonwebtoken'); //importing jwt token
const JWT_SECRET = 'HSK';
const User_middleware = require('../middleware/AdminMiddleware')

router.post('/register',[
body("name").isLength({min:3}),
body("email").isEmail(),
body("password").isLength({min:3}),
],async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(),success:false });
      }
      try {
        let admin = await Admin.findOne({email:req.body.email});
        if(admin){
            return   res.status(400).json({error:"This Email already have an account linked"});
        }
        const salt = await bcrypt.genSalt(9);
        const hashpassword = await bcrypt.hash(req.body.password,salt);
 admin = new Admin({
    name:req.body.name,
    email:req.body.email,
    password:hashpassword,
 });
const save = await admin.save();
 const data = {
    admin:{
        id:admin.id,
    }
}
const AuthToken = jwt.sign(data, JWT_SECRET); // GIVIN JSON TOKEN 1ARGUMENT IS ID OF DTA COLLECTION 2aRGUMENT IS THE SIGNATURE       
res.send({token:AuthToken}); 
      } catch (error) {
        res.status(500).send("Some Server error has been occured") 
        console.log(error)

      }

});

router.post('/login',[body("email").isEmail(),
body("password").exists(),],async(req,res)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array(),success:false });
    }
    const {email,password} = req.body;
    try {
      let admin = await Admin.findOne({email});
      if(!admin){
        return res.status(400).json({ errors: "wrong credentials"});
}
const comparePassword = await bcrypt.compare(password,admin.password);
if(!comparePassword){
  return res.status(400).json({ errors: "wrong credentials"});
}
const data = {
  admin:{
      id:admin.id
  }
}

const AuthToken = jwt.sign(data,JWT_SECRET);
res.json({AuthToken});
} catch (error) {
      res.status(500).send("Some Server error has been occured") 
      console.log(error)

    }
});
router.post('/admin_data',User_middleware,async(req,res)=>{ // onlyv reaquired user_token in the header
try {
 AdminId = req.admin.id;
  const dataAdmin = await Admin.findById(AdminId).select('-password')
  if(!dataAdmin){
    res.send(invalid);
}
res.send(dataAdmin);
} catch (error) {
  res.status(500).send("Some Server error has been occured") 
  console.log(error)

}
});
module.exports = router