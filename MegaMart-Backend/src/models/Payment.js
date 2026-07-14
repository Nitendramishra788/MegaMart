const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
    {

        // Identity

        paymentNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },


        // Relations

        order: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
            required: true,
            index: true,
        },

        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        // Amount

        amount: {
            type: Number,
            required: true,
            min: 0,
        },

        currency: {
            type: String,
            default: "INR",
            uppercase: true,
            trim: true,
        },


        // Gateway

        gateway: {
            type: String,
            enum: ["razorpay"],
            default: "razorpay",
        },

        gatewayOrderId: {
            type: String,
            required: true,
            unique: true,
        },

        gatewayPaymentId: {
            type: String,
            default: null,
        },


        // Payment Status

        paymentStatus: {
            type: String,
            enum: [
                "pending",
                "processing",
                "paid",
                "failed",
                "cancelled",
               " expired",
                "refunded",
            ],
            default: "pending",
            index: true,
        },


        // Verification

        gatewaySignature: {
            type: String,
            default: null,
        },

        verifiedAt: {
            type: Date,
            default: null,
        },


        // Metadata

        paymentMethod: {
            type: String,
            enum: [
                "upi",
                "card",
                "netbanking",
                "wallet",
                "emi",
                "unknown",
            ],
            default: "unknown",
        },

        failureReason: {
            type: String,
            default: null,
            trim: true,
        },


        // Timeline

        paidAt: {
            type: Date,
            default: null,
        },

        paymentAttempt: {
            type: Number,
            default: 1,
        }
    },
    {
        timestamps: true,
    }
);


const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;

