const mongoose = require('mongoose');
const {Schema} = mongoose;
const FileSchema = new Schema({
    filepath:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
        required: true,
    }
});
module.exports = mongoose.model('files',FileSchema);