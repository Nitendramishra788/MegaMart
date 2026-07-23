const asyncHandler = require("../../utils/asyncHandler");
const apiErrr = require("../../utils/apiErrr");
const Review = require("../../models/Review");
const Order = require("../../models/Order");
const Product = require("../../models/Product");
const SellerOrder = require("../../models/SellerOrder");
const Shipping = require("../../models/Shipping");
const mongoose = require("mongoose");



// this this part of create review api

const createReview = asyncHandler(
    async (req, res) => {

        const {
            orderId,
            sellerOrderId,
            productId,
            variantId,
            rating,
            comment,
        } = req.body;

        //ObjectId Validation Missing

        if (
            !mongoose.Types.ObjectId.isValid(orderId) ||
            !mongoose.Types.ObjectId.isValid(sellerOrderId) ||
            !mongoose.Types.ObjectId.isValid(productId) ||
            !mongoose.Types.ObjectId.isValid(variantId)
        ) {
            throw new apiErrr(
                400,
                "Invalid ID."
            );
        }

        // Validate required fields

        if (
            !orderId ||
            !sellerOrderId ||
            !productId ||
            !variantId ||
            !rating ||
            !comment
        ) {
            throw new apiErrr(
                400,
                "All review fields are required."
            )
        };


        // find Order

        const order = await Order.findById(orderId);

        if (!order) {
            throw new apiErrr(
                404,
                "Order not found."
            );
        };

        // Verify Order Ownership

        if (!order.user.equals(req.user._id)) {
            throw new apiErrr(
                403,
                "You are not authorized to review this order."
            );
        };

        // find seller order

        const sellerOrder = await SellerOrder.findById(sellerOrderId);

        if (!sellerOrder) {
            throw new apiErrr(
                404,
                "Seller order not found."
            );
        };

        // verify seller order belongs to order 

        if (!sellerOrder.parentOrder.equals(order._id)) {
            throw new apiErrr(
                400,
                "Seller order does not belong to this order."
            );
        };

        // find shipment 
        const shipment = await Shipping.findOne({
            sellerOrder: sellerOrder._id
        });

        if (!shipment) {
            throw new apiErrr(
                404,
                "Shipment not found."
            );
        };

        if (shipment.status !== "delivered") {
            throw new apiErrr(
                400,
                "Review can only be submitted after product delivery."
            );
        }

        // Check Product exists

        const product = await Product.findById(productId);

        if (!product) {
            throw new apiErrr(
                404,
                "Product not found."
            );
        };


        //  Verify Product + Variant belongs to SellerOrder

        const orderItem = sellerOrder.items.find(
            (item) =>
                item.product.equals(productId) &&
                item.variant.equals(variantId)
        );


        if (!orderItem) {
            throw new apiErrr(
                400,
                "This product was not purchased in this order."
            );
        };


        // Check Duplicate Review

        const existingReview = await Review.findOne({
            user: req.user._id,
            product: productId,
            order: orderId,
        });

        if (existingReview) {
            throw new apiErrr(
                409,
                "You have already reviewed this product for this order."
            );
        };

        //  Create Review
        const review = await Review.create({
            user: req.user._id,
            product: productId,
            variant: variantId,
            order: orderId,
            sellerOrder: sellerOrderId,
            rating,
            comment,
            isVerifiedPurchase: true,
        });

        //  Response
        return res.status(201).json({
            success: true,
            message: "Review created successfully.",
            review,
        });

    });

    module.exports = {
        createReview,
    }