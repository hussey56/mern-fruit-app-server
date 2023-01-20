const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://hassankhan:0BzjqmyAYCde39Kt@hassandd.tz1q2ed.mongodb.net/shop?retryWrites=true&w=majority";

const connectTomongo = ()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("Database Connected");
    });
   
}
module.exports = connectTomongo;