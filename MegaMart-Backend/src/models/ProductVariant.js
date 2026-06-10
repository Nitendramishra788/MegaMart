const mongoose = require("mongoose");
const { seller } = require("../middlewares/sellerMiddleware");

const productVariantSchema  = new mongoose.Schema({

    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"product",
        required:true,
    },

    seller:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,

    },

    sku:{
        type:String,
        required:true,
        unique:true,

    },

    color:{
        type:String,
        default:"",
    },

    size:{
        type:String,
        default:"",
    },

    price:{
        type:Number,
        required:true,

    },

    stock:{
        type:Number,
        required:true,
    },

   
    images: [

  {

    type: String,

  }

],

      isDefault: {
      type: Boolean,
      default: false,
   },
},

{
     timestamps: true,
}

);


module.exports = mongoose.model(
   "ProductVariant",
   productVariantSchema
);

