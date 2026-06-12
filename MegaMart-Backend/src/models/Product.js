const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },

    description: {
        type: String,
        required: true,
    },



    discountPrice: {
        type: Number,
        default: 0,
    },



    brand: {
        type: String,
        default: "",
    },

  
    category: {
    type:
      mongoose.Schema.Types.ObjectId,

    ref: "Category",

    required: true,
},




    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }

    ,

    status: {
        type: String,
        enum: ["pending", "approved", "rejected",],
        default: "pending",
    },

    defaultVariant: {
        type: mongoose.Schema.Types.ObjectId,

        ref: "ProductVariant",
    },

    store: {
        type: mongoose.Schema.Types.ObjectId,

        ref: "store",
    },

    rating: {
        type: Number,
        default: 0,
    },
},

    {
        timestamps: true,
    }

);

module.exports = mongoose.model("product", productSchema);

