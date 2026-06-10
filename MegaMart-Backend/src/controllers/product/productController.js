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



// get only seller product 

const getMyProducts = async(req, res)=>{
  try{

    const products = await Product.find({
      seller:req.user._id,
    })
    .sort({ createdAt: -1 });

    res.status(200).json({
      success:true,
      count: products.length,
      products,
    })



  }catch(err){
    res.status(500).json({
      success:false,
      message:err.message,
    })
  }
}




// here the part of public api

const getAllProducts = async(req , res)=>{
  try{
    const products = await Product.find({
      status:"approved"
    })

    .populate("store" ,  "storeLogo  storeBanner")
    .populate("seller" , "name")
    .sort({ createdAt: -1 });

    res.status(200).json({
      success:true,
      message:"product fetch",
      count:products.length,
      products
    })

  }catch(err){
    res.status(500).json({
      success:false,
      message:err.message,
    })
  }
}


// get single product details

const getSingleProduct = async(req , res)=>{
  try{
    const product = await Product.findById(
      req.params.id,
    )

    .populate("store")
    .populate("seller" , "name email")

    if(!product){
      res.status(404).josn({
        success:false,
        message:"not found product",
      })

    }

    // on;y approved product show for the public

    if(product.status!=="approved"){
      res.status(403).json({
        success:false,
        message:"product not available",
      })
    }


    res.status(200).json({
      success:true,
      product,
    });



  }catch(err){
    res.status(500).json({
      success:false,
      message:err.message,
    })
  }

}

module.exports = {
  createProduct,
  getMyProducts,
  getAllProducts,
 getSingleProduct,
};