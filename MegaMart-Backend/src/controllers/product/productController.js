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

const {

  getProductDetailsService
} = require("../../services/productService");

// CREATE PRODUCT
const createProduct = async (req, res) => {

  try {

    console.log(req.user);

    const {
      title,
      description,
      brand,
      price,
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

      price,

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

const getAllProducts =
  asyncHandler(

    async (req, res) => {

      const { category, brand, min, max, sort, page,
        limit, } =
        req.query;


      // BASE FILTER
      const filter = {
        status: "approved",
      };


      // DECLARE VARIABLE
      let foundCategory;


      // CATEGORY FILTER
      if (category) {

        foundCategory =
          await Category.findOne({

            slug: category,

          });

      }


      // APPLY FILTER
      if (foundCategory) {

        filter.category =
          foundCategory._id;

      }

      // for the brand base searching 
      if (brand) {

        filter.brand = {
          $regex: brand,
          $options: "i"
        }
      };



      if (min && isNaN(Number(min))) {

        throw new apiErrr(
          400,
          "Invalid min price"
        );

      }


      if (max && isNaN(Number(max))) {

        throw new apiErrr(
          400,
          "Invalid max price"
        );

      }

      // for the price base searching 

      if (min || max) {

        filter.price = {};

        if (min) {

          filter.price.$gte =
            Number(min);

        }

        if (max) {

          filter.price.$lte =
            Number(max);

        }

      }


      // SORTING

      let sortOption = {
        createdAt: -1,
      };


      // LOW TO HIGH
      if (sort === "low") {

        sortOption = {
          price: 1,
        };

      }


      // HIGH TO LOW
      if (sort === "high") {

        sortOption = {
          price: -1,
        };

      }


      // TOP RATED
      if (sort === "rating") {

        sortOption = {
          rating: -1,
        };

      }


      // LATEST
      if (sort === "latest") {

        sortOption = {
          createdAt: -1,
        };

      }


      // this is part of paging product 

      const currentPage = Number(page) || 1;
      const perPage = Number(limit) || 5;
      const skip = (currentPage - 1) * perPage;



      const totalProducts = await Product.countDocuments(filter);

      // FETCH PRODUCTS
      const products =
        await Product.find(filter)

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

          .sort(sortOption)

          .skip(skip)

          .limit(perPage);

      res.status(200).json({

        success: true,

        message:
          "Products fetched",

        count:
          products.length,
        totalProducts,

        currentPage,

        totalPages:
          Math.ceil(
            totalProducts / perPage
          ),

        products,

      });

    }

  );

// get single product details

const getSingleProduct = asyncHandler( async (req, res) => {
  
   const data = await getProductDetailsService(req.params.id);

     
   if(!data){
    throw new apiErrr(
      404,
      "product not found"
    )
   }

    

    // only approved product show for the public

    if (data.product.status !== "approved") {
    throw new apiErrr(
      403,
      "Product not available"
    );
  }


    res.status(200).json({
      success: true,
      ...data,
    });




})

// get product by category slug

const getProductbyCategory =
  asyncHandler(

    async (req, res) => {

      const { slug } =
        req.params;


      // FIND CATEGORY
      const category =
        await Category.findOne({
          slug,
        });


      if (!category) {

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

        success: true,

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

    async (req, res) => {

      const { q } =
        req.query;


      // CHECK EMPTY QUERY
      if (!q) {

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


