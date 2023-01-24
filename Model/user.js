const mongoose = require('mongoose');
const {Schema} = mongoose;
const UserSchema = new Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        default:'Not Described'
    },
    address:{
        type:String,
     default:'Add Your Address'
    },
    timestamp:{
        type:Date,
        default:Date.now
    }
});
const Users =  mongoose.model('users',UserSchema);
module.exports = Users