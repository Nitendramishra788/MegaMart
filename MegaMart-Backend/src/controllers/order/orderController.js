const asyncHandler = require("../../utils/asyncHandler");
const apiErrr = require("../../utils/apiErrr");
const Cart = require("../../models/Cart");
const Address = require("../../models/Address");
const Variant = require("../../models/ProductVariant");
const Product = require("../../models/Product");
const calculateShippingCharge = require("../../utils/calculateShipping");
const Oder = require("../../models/Order");

// this is part of Mongoose Transsaction
const mongoose = require("mongoose");


// create product business logic

const createOder = asyncHandler(
    async (req, res) => {
        const session = await mongoose.startSession();
        try {
            session.startTransaction();
            // find user
            const userId = req.user._id;
            let subTotal = 0;
            const orderItems = [];

            if (!userId) {
                throw new apiErrr(
                    404,
                    "user not found..!"
                );
            }

            // find cart
            const cart = await Cart.findOne({
                user: userId,
            }).session(session);

            if (!cart || cart.items.length === 0) {
                throw new apiErrr(
                    404,
                    "cart not found..!"
                );
            }

            // validate every Cart items

            for (const item of cart.items) {

                // validate variant
                const variant = await Variant.findById(item.variant).session(session);

                if (!variant) {
                    throw new apiErrr(
                        404,
                        "variant not found.."
                    );
                }

                // validate variant status
                if (!variant.isDefault) {
                    throw new apiErrr(
                        404,
                        "Variant is currently unavailable."
                    );
                }

                // validate product
                const product = await Product.findById(item.product).session(session);

                if (!product) {
                    throw new apiErrr(
                        404,
                        "product not found...!"
                    );
                }

                if (product.status !== "approved") {
                    throw new apiErrr(
                        400,
                        "product is currently unavailable."
                    );
                }

                // validate stock
                if (item.quantity > variant.stock) {
                    throw new apiErrr(
                        409,
                        "Requested quantity is out of stock."
                    );
                }

                // calculate subtotal
                const itemTotal = variant.price * item.quantity;

                subTotal += itemTotal;

                // items section
                const orderItem = {
                    product: item.product,
                    variant: item.variant,
                    title: product.title,
                    brand: product.brand,
                    sku: variant.sku,
                    color: variant.color,
                    size: variant.size,
                    image: variant.images[0] || "",
                    unitPrice: variant.price,
                    quantity: item.quantity,
                    itemTotal: itemTotal,
                };

                orderItems.push(orderItem);


                // Stock Reduce
                variant.stock -= item.quantity;
                await variant.save({ session });


            }

            // validate address
            const address = await Address.findOne({
                user: userId,
                isDefault: true,
            }).session(session);

            if (!address) {
                throw new apiErrr(
                    409,
                    "Please add a delivery address."
                );
            }

            // cal shipping charge
            const shippingCharge = calculateShippingCharge(subTotal);

            const tax = 0;
            const discount = 0;

            const grandTotal = subTotal + shippingCharge + tax - discount;

            // Shipping Address Snapshot
            const shippingAddress = {
                fullName: address.fullName,
                phone: address.phone,
                addressLine1: address.addressLine1,
                addressLine2: address.addressLine2,
                landmark: address.landmark,
                city: address.city,
                state: address.state,
                country: address.country,
                pincode: address.pincode,
                addressType: address.addressType,
            };

            // Pricing Snapshot
            const pricing = {
                subTotal,
                shippingCharge,
                tax,
                discount,
                grandTotal,
            };

            // Payment Snapshot
            const payment = {
                method: "COD",
                status: "pending",
            };



            //  cart items clear 

            cart.items = [];
            await cart.save({ session })

            // Generate Order Number
            const orderNumber = `ORD-${Date.now()}`;


            // reduceing stock 


            // combine all oder data together ...

            const oderData = {
                user: userId,
                items: orderItems,
                shippingAddress,
                pricing,
                payment,
                orderNumber,
                orderStatus: "pending",
            };

            // Snapshot of oder

            const [oder] = await Oder.create([oderData], { session });

            await session.commitTransaction();

            res.status(201).json({
                success: true,
                message: "Order created successfully.",
                data: oder,
            });

        } catch (err) {
            await session.abortTransaction();

            throw err;
        } finally {
            session.endSession();
        }

    }
);



// get orders api

const getOders = asyncHandler(
    async (req, res) => {
        const userId = req.user._id;

        const orders = await Oder.find({
            user: userId
        }).sort({ createdAt: -1 });

        const count = orders.length;


        if (!orders || orders.length === 0) {
            throw new apiErrr(
                404,
                "No orders found for this user."
            )
        };

        res.status(200).json({
            success: true,
            message: "Orders retrieved successfully.",
            data: orders,
            count: count,
        });
    }
);


// get single order api

const getSingleOrder = asyncHandler(
    async (req, res) => {
        const {orderId} = req.params;

        const order = await Oder.findById(orderId);

        if(!order){
            throw new apiErrr(
                404,
                "Order not found."
            )
        };

        res.status(200).json({
            success: true,
            message: "Order retrieved successfully.",
            data: order,
        });
    
    
    }
)

// cancel order api 

const cancelOrder = asyncHandler(
    async (req, res) => {

        const { orderId } = req.params;

        const order = await Oder.findById(orderId);

        if (!order) {
            throw new apiErrr(
                404,
                "Order not found."
            );
        };

        //check ownership
        if (order.user.toString() !== req.user._id.toString()) {
            throw new apiErrr(
                403,
                "You are not authorized to cancel this order."
            );
        };

        // check order status already cancelled
        if (order.orderStatus === "cancelled") {
            throw new apiErrr(
                400,
                "Order is already cancelled."
            );
        };

        // check order status not allowed if processed
        if (order.orderStatus !== "pending") {
            throw new apiErrr(
                400,
                "Not allowed to cancel this order. Order is already processed."
            );
        };

        // restore stock
        for (const item of order.items) {

            const variant = await Variant.findById(item.variant);

            if (variant) {
                variant.stock += item.quantity;
                await variant.save();
            }
        }

        // update order status
        order.orderStatus = "cancelled";

        await order.save();

        res.status(200).json({
            success: true,
            message: "Order cancelled successfully.",
            data: order,
        });

    }
);


module.exports = {
    createOder,
    getOders,
    getSingleOrder,
    cancelOrder,
};
