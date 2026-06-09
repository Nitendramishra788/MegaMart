const mongoose = require("mongoose");

const productSchema = new  mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
    },

    description:{
        type:String,
        required:true,
    },

    price:{
        type:Number,
        required:true,
    },

    discountPrice:{
        type:Number,
        default:0,
    },

    stock:{
        type:Number,
        required:true,
    },

    brand:{
        type:String,
        default:"",
    },

    category:{
        type:String,
        required:true,
    },

    images:[
        {
            type:String,
        },
    ],


    seller:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    }

    ,

    rating:{
        type:Number,
        default:0,
    },
},

 {
    timestamps: true,
  }

);

module.exports = mongoose.model("product" , productSchema);

