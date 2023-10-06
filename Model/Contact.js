const { text } = require('express');
const mongoose = require('mongoose')
const {Schema} = mongoose;

const ContactSchema = new Schema({

        name:{
            type:String,
            required:true,
        
        },
        email:{
            type:String,
            required:true,
         
        },
        
        Phone:{
            type:String,
            required:true,

        },
        subject:{
            type:String,
            required:true,

        },
        message:{
            type:String,
            required:true,
        },
        seen:{
            type:Boolean,
            default:false
        },
        timestamp:{
            type:Date,
            default:Date.now
        }

});
module.exports = mongoose.model('messages',ContactSchema);