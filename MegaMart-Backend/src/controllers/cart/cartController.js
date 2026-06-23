const Variant = require("../../models/ProductVariant");
const Cart = require("../../models/Cart");
const asyncHandler = require("../../utils/asyncHandler");
const apiErrr = require("../../utils/apiErrr");

const addCart = asyncHandler(async (req, res) => {
  const { variantId, quantity = 1 } = req.body;

  // quantity validation
  if (quantity < 1) {
    throw new apiErrr(
      400,
      "Quantity must be greater than 0"
    );
  }

  // validate variant
  const variant = await Variant.findById(variantId);

  if (!variant) {
    throw new apiErrr(
      404,
      "Variant not found"
    );
  }

  // stock check
  if (variant.stock < quantity) {
    throw new apiErrr(
      400,
      "Insufficient stock"
    );
  }

  // find user cart
  const cart = await Cart.findOne({
    user: req.user._id,
  });

  // create new cart if not exists
  if (!cart) {
    const newCart = await Cart.create({
      user: req.user._id,
      items: [
        {
          product: variant.product,
          variant: variant._id,
          quantity,
        },
      ],
    });

    return res.status(201).json({
      success: true,
      message: "Cart created successfully",
      cart: newCart,
    });
  }

  // check existing item
  const existingItem = cart.items.find(
    (item) =>
      item.variant.toString() ===
      variant._id.toString()
  );

  if (existingItem) {
    // quantity update
    existingItem.quantity += quantity;

    // optional stock re-check
    if (existingItem.quantity > variant.stock) {
      throw new apiErrr(
        400,
        "Requested quantity exceeds available stock"
      );
    }
  } else {
    // add new item
    cart.items.push({
      product: variant.product,
      variant: variant._id,
      quantity,
    });
  }

  await cart.save();

  res.status(200).json({
    success: true,
    message: "Cart updated successfully",
    cart,
  });
});



const getCart = asyncHandler(
  async (req, res) => {

    const cart = await Cart.findOne({
      user: req.user._id,
    })
      .populate(
        "items.product",
        "title brand price"
      )
      .populate(
        "items.variant",
        "price stock attributes"
      );

    // EMPTY CART

    if (!cart || cart.items.length === 0) {
      return res.status(200).json({
        success: true,
        message: "Cart is empty",
        cart: {
          items: [],
          totalItems: 0,
          totalPrice: 0,
        },
      });
    }

    // CALCULATION VARIABLES

    let totalPrice = 0;
    let totalItems = 0;

    // FORMAT ITEMS + CALCULATE TOTALS

    const formattedItems = cart.items.map(
      (item) => {

        const product = item.product;
        const variant = item.variant;

        const itemPrice =
          (variant?.price || 0) *
          item.quantity;

        totalPrice += itemPrice;
        totalItems += item.quantity;

        return {
          _id: item._id,

          product: {
            _id: product?._id,
            title: product?.title,
            brand: product?.brand,
          },

          variant: {
            _id: variant?._id,
            price: variant?.price,
            stock: variant?.stock,
            attributes:
              variant?.attributes,
          },

          quantity: item.quantity,

          itemTotal: itemPrice,
        };
      }
    );

    res.status(200).json({
      success: true,
      message:
        "Cart fetched successfully",

      cart: {
        items: formattedItems,
        totalItems,
        totalPrice,
      },
    });

  }
);


// this is part of update api

const updateCart = asyncHandler(
  async (req, res) => {

    const { variantId, quantity } = req.body;

    // quantity validation
    if (quantity < 1) {
      throw new apiErrr(
        400,
        "Quantity must be greater than 0"
      );
    }

    // find variant
    const variant = await Variant.findById(
      variantId
    );

    if (!variant) {
      throw new apiErrr(
        404,
        "Variant not found"
      );
    }

    // stock check
    if (quantity > variant.stock) {
      throw new apiErrr(
        400,
        "Insufficient stock"
      );
    }

    // find cart
    const cart = await Cart.findOne({
      user: req.user._id,
    });

    if (!cart) {
      throw new apiErrr(
        404,
        "Cart not found"
      );
    }

    // find cart item
    const existingItem = cart.items.find(
      (item) =>
        item.variant.toString() ===
        variant._id.toString()
    );

    if (!existingItem) {
      throw new apiErrr(
        404,
        "Item not found in cart"
      );
    }

    // update quantity
    existingItem.quantity = quantity;

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      cart,
    });

  }
);

// this is part of remove cart api

const removeCart = asyncHandler(
  async (req, res) => {
    const { variantId } = req.body;

    const variant = await Variant.findById(variantId);

    if (!variant) {
      throw new apiErrr(
        404,
        "variant not found..!"
      )
    };

    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      throw new apiErrr(
        404,
        "cart not found..!"
      );
    };

    const existItem = cart.items.find(
      (item) =>
        item.variant.toString() ===
        variant._id.toString()
    );

    if (!existItem) {
      throw new apiErrr(
        404,
        "Item not found...!"
      )
    } else {
      cart.items = cart.items.filter(
        item =>
          item.variant.toString() !==
          variant._id.toString()
      );

      await cart.save();

      res.status(200).json({
        success: true,
        message: "Item removed from cart",
        cart,
      });
    }
  }
);


// this is all clear cart api 

const allClearCart = asyncHandler(
  async(req , res)=>{

    const cart = await Cart.findOne({user: req.user._id});

       if(!cart){
      throw new apiErrr(
        404,
        "Data not found"
      )
    }else{
      cart.items = [];
    }

    
    await cart.save();


    res.status(200).json({
      success: true,
      message: "Cart all data clear succesfuly..!",
      cart
    })
    
  }
);

module.exports = {
  addCart,
  getCart,
  updateCart,
  removeCart,
  allClearCart
};