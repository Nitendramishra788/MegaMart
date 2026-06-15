const Product = require("../../models/Product");

const Store = require("../../models/Store");

const mongoose =
  require("mongoose");

const Category =
  require("../../models/Category");

const apiErrr =
  require("../../utils/apiErrr");
const asyncHandler = require("../../utils/asyncHandler");
const { populate } = require("../../models/User");

// CREATE PRODUCT
const createProduct = async (req, res) => {

  try {

    console.log(req.user);

    const {
      title,
      description,
      brand,
      category,
    } = req.body;

    // category validation

    if (!mongoose.Types.ObjectId.isValid(category)) {
      throw new apiErrr(
        400,

        "Invalid category ID !"
      )
    }

    // CATEGORY EXISTS or not

    const existCategory = await Category.findById(category);

    if (!existCategory) {
      throw new apiErrr(
        400,
        "this category already exist"
      )
    }

    // seller store
    const store = await Store.findOne({
      owner: req.user._id,
    });

    if (!store) {
      return res.status(404).json({
        success: false,
        message: "Store not found",
      });
    }





    // create product
    const product = await Product.create({

      title,

      description,



      brand,

      category,



      seller: req.user._id,

      store: store._id,

    });


    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }

};



// get only seller product 

const getMyProducts = async (req, res) => {
  try {

    const products = await Product.find({
      seller: req.user._id,
    })
      .populate("defaultVariant")
      .populate(
        "category",
        "name slug"
      )
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    })



  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    })
  }
}




// here the part of public api

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({
      status: "approved"
    })

      .populate("store", "storeLogo  storeBanner")
      .populate("seller", "name")
      .populate(
        "category",
        "name slug"
      )
      .populate("defaultVariant")

      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "product fetch",
      count: products.length,
      products
    })

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    })
  }
}


// get single product details

const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(
      req.params.id,
    )

      .populate("defaultVariant")
      .populate("store")
      .populate("seller", "name email")
      .populate(
        "category",
        "name slug"
      )

    if (!product) {
      res.status(404).josn({
        success: false,
        message: "not found product",
      })

    }

    // on;y approved product show for the public

    if (product.status !== "approved") {
      res.status(403).json({
        success: false,
        message: "product not available",
      })
    }


    res.status(200).json({
      success: true,
      product,
    });



  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    })
  }

}
// get product by category slug

const getProductbyCategory =
asyncHandler(

  async(req , res)=>{

    const { slug } =
    req.params;


    // FIND CATEGORY
    const category =
    await Category.findOne({
      slug,
    });


    if(!category){

      throw new apiErrr(
        404,
        "Category not found"
      );
    }


    // FIND PRODUCTS
    const products =
    await Product.find({

      category:
      category._id,

      status:
      "approved"

    })

    .populate(
      "category",
      "slug name"
    )

    .populate(
      "seller",
      "name"
    )

    .populate(
      "store",
      "storeName storeBanner"
    )

    .populate(
      "defaultVariant"
    )

    .sort({
      createdAt: -1,
    });


    res.status(200).json({

      success:true,

      message:
      "Category products fetched",

      category:
      category.name,

      count:
      products.length,

      products,

    });

  }

);

// SEARCH PRODUCTS

const searchProducts =
asyncHandler(

  async(req , res)=>{

    const { q } =
    req.query;


    // CHECK EMPTY QUERY
    if(!q){

      throw new apiErrr(
        400,
        "Search query is required"
      );

    }


    // SEARCH PRODUCTS
    const products =
    await Product.find({

      status: "approved",

      $or: [

        {
          title: {
            $regex: q,
            $options: "i",
          },
        },

        {
          description: {
            $regex: q,
            $options: "i",
          },
        },

        {
          brand: {
            $regex: q,
            $options: "i",
          },
        },

      ],

    })

    .populate(
      "category",
      "name slug"
    )

    .populate(
      "seller",
      "name"
    )

    .populate(
      "store",
      "storeName storeBanner"
    )

    .populate(
      "defaultVariant"
    )

    .sort({
      createdAt: -1,
    });


    res.status(200).json({

      success: true,

      message:
      "Products fetched successfully",

      count:
      products.length,

      products,

    });

  }

);

module.exports = {
  createProduct,
  getMyProducts,
  getAllProducts,
  getSingleProduct,
  getProductbyCategory,
  searchProducts,
};