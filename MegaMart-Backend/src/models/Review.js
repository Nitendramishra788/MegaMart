const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
    {
        //  Customer who created the review
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        //  Reviewed Product
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },

        //  Purchased Variant
        variant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Variant",
            required: true,
        },

        //  Original Order
        order: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
            required: true,
        },

        //  Seller Order
        sellerOrder: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SellerOrder",
            required: true,
        },

        //  Rating
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },

        //  Customer Review
        comment: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
            maxlength: 2000,
        },

        //  Purchase Verification
        isVerifiedPurchase: {
            type: Boolean,
            default: true,
        },

        //  Review Status
        status: {
            type: String,
            enum: [
                "published",
                "hidden",
                "reported",
                "deleted",
            ],
            default: "published",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Review", reviewSchema);