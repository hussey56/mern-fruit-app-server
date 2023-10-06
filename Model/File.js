const mongoose = require('mongoose');
const {Schema} = mongoose;
const FileSchema = new Schema({
    filepath:{
        type:String,
        required:true,
    },
    file_type:{
type:String,
default:'png',
required:true,
    },
    file_size:{
        type:String,
        default:'200',
        required:true,
    },
    timestamp:{
        type:Date,
        default:Date.now(),
        required:true,
    }
});
module.exports = mongoose.model('files',FileSchema);