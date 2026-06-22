const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true,
    },

     items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true,
      },

      variant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductVariant",
        required: true,
      },

      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],

});

module.exports = mongoose.model("Cart" , cartSchema);