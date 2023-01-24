const mongoose = require('mongoose');
const {Schema} = mongoose;
const FileSchema = new Schema({
    filepath:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        default:'Hassan'
    },
    phone:{
        type:Number,
        default:32423423523,
       
    }
});
module.exports = mongoose.model('files',FileSchema);