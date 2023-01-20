const mongoose = require('mongoose');
const {Schema} = mongoose;
const OrderSchema = new Schema({
    user:{ // making a foriegn key for user id
        type:mongoose.Schema.Types.ObjectId, // by object id if the user model
        ref:'prd'
            },
name:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true,
},
phone:{
    type:String,
    required:true
},
address:{
    type:String,
    required:true,
},
payment:{
    type:String,
    required:true,
    default:'COD',
},
zip:{
    type:String,
    required:true,
},
user_id:{
    type:String,
    required:true,
    default:'652398745623',
},
cart:{
    type:Array,
    required:true,
    default:[],
},
cartTotal:{
    type:String,
    required:true,
    default:0,
},
timestamp:{
    type:Date,
    default:Date.now
}

});
module.exports = mongoose.model('orders',OrderSchema);
