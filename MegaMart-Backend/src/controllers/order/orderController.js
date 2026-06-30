const asyncHandler = require("../../utils/asyncHandler");
const apiErrr = require("../../utils/apiErrr");
const Cart = require("../../models/Cart");
const Address = require("../../models/Address");
const Variant = require("../../models/ProductVariant");
const Product = require("../../models/Product");
const calculateShippingCharge = require("../../utils/calculateShipping");
const Oder = require("../../models/Order");

// create product business logic

const createOder = asyncHandler(
    async (req, res) => {

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
        });

        if (!cart || cart.items.length === 0) {
            throw new apiErrr(
                404,
                "cart not found..!"
            );
        }

        // validate every Cart items

        for (const item of cart.items) {

            // validate variant
            const variant = await Variant.findById(item.variant);

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
            const product = await Product.findById(item.product);

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
        }

        // validate address
        const address = await Address.findOne({
            user: userId,
            isDefault: true,
        });

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

        // Generate Order Number
        const orderNumber = `ORD-${Date.now()}`;

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

        const oder = await Oder.create(oderData);

        res.status(201).json({
            success: true,
            message: "Order created successfully.",
            data: oder,
        });

    }
);

module.exports = {
    createOder,
};