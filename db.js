const mongoose = require('mongoose');
const mongoURI = process.env.MONGO_URI;

const connectTomongo = ()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("Database Connected");
    });
   
}
module.exports = connectTomongo;