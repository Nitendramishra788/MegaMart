const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema({
    storeName:{
        type:String,
        required:true,
        trim:true,
    },

    storeDescription:{
        type:String,
        default:"",
    },

    storeLogo:{
        type:String,
        default:"",
    },

    storeBanner:{
        type:String,
        default:"",
    },

    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
        unique:true,
    },

    isVerified:{
        type:Boolean,
        default:false,
    },

    rating:{
        type:Number,
        default:0,
    }
},

{
    timeseries:true,
}

)

module.exports = mongoose.model("store" , storeSchema);