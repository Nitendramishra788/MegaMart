const Product = require("../../models/Product");

const Store = require("../../models/Store");


// CREATE PRODUCT
const createProduct = async (req, res) => {

  try {

    console.log(req.user);

    const {
      title,
      description,
      price,
      discountPrice,
      stock,
      brand,
      category,
    } = req.body;


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


    // images
    const images = req.files.map(
      (file) => file.filename
    );


    // create product
    const product = await Product.create({

      title,

      description,

      price,

      discountPrice,

      stock,

      brand,

      category,

      images,

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


module.exports = {
  createProduct,
};