const asyncHandler = require("../../utils/asyncHandler");
const apiErrr = require("../../utils/apiErrr");
const Payment = require("../../models/Payment");
const mongoose = require("mongoose");
const Order = require("../../models/Order");
// const { default: mongoose } = require("mongoose");
const generateSequence = require("../../utils/generateSequence");
const razorpay = require("../../config/rezorpay")

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
            // paymentNumber: "GENERATE_PAYMENT_NUMBER", // replace with your logic
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


module.exports= {
    createPayment,
}