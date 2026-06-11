const Product = require("../../models/Product");
const ProductVariant = require("../../models/ProductVariant");


// create product variant 

const createVariant = async (req, res) => {
    try {
        const {
            color,

            size,

            price,

            stock,

            sku,

            isDefault,
        } = req.body;

        // find product 

        const product = await Product.findById(

            req.params.productId,
        );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "product not found"
            })
        }

        // image setup

        const images = req.files.map(

            (file) => file.filename

        );

        // create variant here 

        const variant = await ProductVariant.create({
            product: product._id,

            seller: req.user._id,

            color,

            size,

            price,

            stock,

            sku,

            images,

            isDefault,


        });


        // SET DEFAULT VARIANT
        if (isDefault) {

            product.defaultVariant = variant._id;

            await product.save();

        }


        res.status(201).json({
            success: true,
            message: "variant created successfully",
            variant
        })



    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    };
};


// get product variant

const getProductVariants = async (req, res) => {
    try {
        const variants = await ProductVariant.find({
            product: req.params.productId,
        })

            .sort({ createdAt: -1 });

       res.status(200).json({

    success: true,

    message: "variant result fetch",

    count: variants.length,

    variants,

});


    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        })
    }
}


// set default variant 

const setDefaultVariant = async (req, res) => {
    try {
        const variant = await ProductVariant.findById(
            req.params.variantId,
        )

        if (!variant) {
            return res.status(404).json({
                success: false,
                message: "variant not found"
            })
        }

        if(
            variant.seller.toString() !=
            req.user._id.toString()                              
        ){

            return res.status(403).json({
                success:false,
                message:"Unauthorized aceess "
            })
        }

        await Product.findByIdAndUpdate(
            variant.product,

            {
                defaultVariant: variant._id,
            }
        );

        res.status(200).json({

            success: true,

            message: "Default variant updated",

        });
    } catch (err) {

        res.status(500).json({

            success: false,

            message: err.message,

        });

    }
}



module.exports = {

  createVariant,

  getProductVariants,

  setDefaultVariant,

};