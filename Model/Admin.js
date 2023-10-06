const mongoose = require('mongoose');
const {Schema} = mongoose;
const AdminSchema = new Schema({
name:{
    type:String,
    required:true,
    unique:true,
},
email:{
    type:String,
    require:true,
    unique:true,
},
password:{
    type:String,
    required:true,
    default:'12345',
    min:3,
},
role:{
    type:String,
    default:'admin'
},
created_at:{
    type:Date,
    default:Date.now()
},
created_by:{
    type:String,
    default:'super admin',
}
});
module.exports = mongoose.model('admin',AdminSchema,);