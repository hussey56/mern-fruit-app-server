const mongoose = require('mongoose');
const { Schema } = mongoose; // include it to make a schema

const ProductsSchema = new Schema({
    user:{ // making a foriegn key for user id
        type:mongoose.Schema.Types.ObjectId, // by object id if the user model
        ref:'prd'
            },
        Product_name:{
            type:String,
            required:true,
            unique:true
        },
        img:{
            type:String,
            required:true,
        },
        Price:{
            type:Number,
            min: 0, // minimum value allowed
    max: 400, // maximum value allowed
            required:true,
         
        },
        status:{
            type:String,
            default:"General",
        },
        category:{
            type:String,
        default:"General"
        },
        timestamp:{
            type:Date,
            default:Date.now
        }

});
module.exports = mongoose.model('products',ProductsSchema);