
const jwt = require('jsonwebtoken'); //importing jwt token
const JWT_SECRET = 'HSK';

const fetchUser = (req,res,next)=>{
const token = req.header('user_token');// getting the token from the header
if(!token){
    res.send(401).send({error:"Please authenticate using a valid token"});
}
try {
    const data = jwt.verify(token,JWT_SECRET);// decoding jwt token to retrieve id from it
    req.user = data.user;
    next();// it used to return the final or break the function
} catch (error) {
    res.send(401).send({error:"Please authenticate using a valid token"});
 
}
} 
module.exports = fetchUser;