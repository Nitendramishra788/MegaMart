const asyncHandler = require("../../utils/asyncHandler");
const apiErrr = require("../../utils/apiErrr");
const Variant = require("../../models/ProductVariant");
const Product = require("../../models/Product");
const Cart = require("../../models/Cart");
const Address = require("../../models/Address");
const calculateShippingCharge = require("../../utils/calculateShipping");



const reviewCheckout = asyncHandler(
    async (req, res) => {
        const userId = req.user._id;

        // find cart 

        const cart = await Cart.findOne({
            user: userId
        });

        if (!cart || cart.items.length === 0) {
            throw new apiErrr(
                404,
                "cart not found..!"
            )
        }

      
       //validate every cart item
        let subTotal = 0;

for (const item of cart.items) {

    // Find Variant
    const variant = await Variant.findById(item.variant);

    // Variant Exists?
    if (!variant) {
        throw new apiErrr(
            404,
            "Variant not found."
        );
    }

    // Variant Active?
    if (!variant.status) {
        throw new apiErrr(
            400,
            "Variant is currently unavailable."
        );
    }

    // Stock Check
    if (item.quantity > variant.stock) {
        throw new apiErrr(
            409,
            "Requested quantity is out of stock."
        );
    }

    // find product

    const product = await Product.findById(item.product);

    if(!product){
        throw new apiErrr(
            404,
            "product not found..!"
        )
    }

    if(!product.status){
        throw new apiErrr(
             400,
            "product  is currently unavailable."
        )
    }

    let itemTotal = variant.price * item.quantity;

    
   subTotal  += itemTotal;
}

// Address geting part..!
const address = await Address.findOne({
    user: userId,
    isDefault: true,
});

if(!address){
    throw new apiErrr(
        409,
        "Please add a delivery address."
        
    )
}

// cal shipping charge 
const shippingCharge = calculateShippingCharge(subTotal);

const tax = 0;
const discount = 0;

// calculate grand total
const grandTotal = subTotal + shippingCharge + tax - discount;
    

res.status(200).json({
    success:true,
    message:"review page details",

     cart,

    address,

    subTotal,

    shippingCharge,

    tax,

    discount,

    grandTotal,

});

 }
);




module.exports = {
    reviewCheckout,
}