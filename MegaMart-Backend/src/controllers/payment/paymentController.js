const asyncHandler = require("../../utils/asyncHandler");
const apiErrr = require("../../utils/apiErrr");
const Payment = require("../../models/Payment");
const mongoose = require("mongoose");
const Order = require("../../models/Order");
// const { default: mongoose } = require("mongoose");
const generateSequence = require("../../utils/generateSequence");
const razorpay = require("../../config/rezorpay")
const verifyRazorpaySignature = require("../../utils/verifyRazorpaySignature");

const createPayment = asyncHandler(
    async (req, res) => {
        const { orderId } = req.body;

        // validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            throw new apiErrr(
                400,
                "Invaild orderId please check..!"
            )
        }

        // find order 
        const order = await Order.findById(orderId);

        if (!order) {
            throw new apiErrr(
                404,
                "order not found..!"
            )
        };

        // check ownerShip

        if (!order.user.equals(req.user._id)) {
            throw new apiErrr(
                403,
                "This order does not belong to you.!"
            )
        };



        //    check payment method 

        if (order.payment.method === "COD") {
            throw new apiErrr(
                409,
                "this payment collect by the delevery partner..!"
            )
        }



        if (order.payment.status === "paid") {
            throw new apiErrr(
                400,
                "this order payment already paid..!"
            )
        };

        if (order.orderStatus === "cancelled") {
            throw new apiErrr(
                400,
                "Cancelled orders cannot be paid.   !"
            )
        };



        // existing pending payment 
        console.log("Payment =>", Payment);

        const pendingPayment = await Payment.findOne({
            order: order._id,
            paymentStatus: "pending"
        });

        if (pendingPayment) {

            return res.status(200).json({
                success: true,
                message: "Existing pending payment found.",
                data: {
                    payment: pendingPayment
                }
            })

        }



        const razorpayOrder = await razorpay.orders.create({
            amount: order.pricing.grandTotal * 100,
            currency: "INR",
            receipt: order.orderNumber,
            notes: {
                orderId: order._id.toString(),
                orderNumber: order.orderNumber,
                customerId: req.user._id.toString(),
            },
        });


        // create payment document
        const paymentNumber = await generateSequence(
            "paymentNumber",
            "PAY"
        );



        const payment = await Payment.create({

            paymentNumber: paymentNumber,

            order: order._id,
            customer: req.user._id,

            amount: order.pricing.grandTotal,
            currency: "INR",

            gateway: "razorpay",
            gatewayOrderId: razorpayOrder.id,

            paymentStatus: "pending",
            paymentAttempt: 1,
        });


        // Response
        return res.status(201).json({
            success: true,
            message: "Payment created successfully.",
            data: {
                payment,
                razorpayOrder
            }
        });


    }
)


// this is part of varify api

const verifyPayment =
    async (req, res) => {

        const {
            paymentId,
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature
        } = req.body;

        // Input Validation
        if (
            !paymentId ||
            !razorpay_payment_id ||
            !razorpay_order_id ||
            !razorpay_signature
        ) {
            throw new apiErrr(400, "All fields are required.");
        }


        // ObjectId Validation
        if (!mongoose.Types.ObjectId.isValid(paymentId)) {
            throw new apiErrr(400, "Invalid payment id.");
        }


        // find payment 

        const payment = await Payment.findById(paymentId);

        if (!payment) {
            throw new apiErrr(
                404,
                "payment not found..!"
            )
        }

        // find order

        const order = await Order.findById(payment.order);

        if (!order) {
            throw new apiErrr(
                404,
                "order not found...!"
            )
        };

        // check ownerShip

        if (!order.user.equals(req.user._id)) {
            throw new apiErrr(
                403,
                "this is not belong to you..!"
            )
        };

        // order cancelled

        if (order.orderStatus === "cancelled") {
            throw new apiErrr(
                400,
                "cancelled order cannt verified..!"
            )
        };

        // payment already paid

        if (payment.paymentStatus === "paid") {
            throw new apiErrr(
                409,
                "Payment has already been verified."
            );
        };


        // gateway order match

        if (payment.gatewayOrderId !== razorpay_order_id) {
            throw new apiErrr(
                400,
                "Invalid gateway order."
            );
        }


        // signature verification

        const isValid = verifyRazorpaySignature(
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        );

        if (!isValid) {
            throw new apiErrr(
                400,
                "Invalid payment signature."
            )
        };

        // Transaction Start

        const session = await mongoose.startSession();

        try {

            session.startTransaction();

            // payment save and update
            const now = new Date();

            payment.paymentStatus = "paid";
            payment.gatewayPaymentId = razorpay_payment_id;
            payment.gatewaySignature = razorpay_signature;
            payment.verifiedAt = now;
            payment.paidAt = now;

            await payment.save({ session });

            // order save
            order.payment.status = "paid";
            order.payment.transactionId = razorpay_payment_id;

            await order.save({ session });

            await session.commitTransaction();

            // response 

            return res.status(200).json({
                success: true,
                message: "Payment verified successfully.",
                data: {
                    paymentId: payment._id,
                    orderId: order._id,
                    paymentStatus: payment.paymentStatus
                }
            });


        } catch (error) {

            await session.abortTransaction();

            throw error;

        } finally {

            session.endSession();

        }



    }



module.exports = {
    createPayment,
    verifyPayment,
}