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



        if (isDefault) {

            // REMOVE OLD DEFAULT VARIANT
            await ProductVariant.updateMany(

                {

                    product: product._id,

                    isDefault: true,

                },

                {

                    isDefault: false,

                }

            );


            // SET NEW DEFAULT
            variant.isDefault = true;

            await variant.save();


            // UPDATE PRODUCT
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

        if (
            variant.seller.toString() !=
            req.user._id.toString()
        ) {

            return res.status(403).json({
                success: false,
                message: "Unauthorized aceess "
            })
        }


        // REMOVE OLD DEFAULT VARIANTS
        await ProductVariant.updateMany(

            {

                product: variant.product,

                isDefault: true,

            },

            {

                isDefault: false,

            }

        );


        // SET NEW DEFAULT
        variant.isDefault = true;

        await variant.save();


        // UPDATE PRODUCT
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


// Update variant 

const updateVariant = async(req, res)=>{
    try{
        const variant = await ProductVariant.findById(
            req.params.variantId,
        );

        if(!variant){

            return res.status(404).json({
                success:false,
                message:"variant not found",
            })
        }

        // seller ownerShip of variant 

        if(
            variant.seller.toString =!
            req.user._id.toString
        ){
            return res.status(403).json({
                success:false,
                message:"Unauthorized access",
            });
        }

        
        const {
             color,

            size,

            price,

            stock,

            sku,
        } = req.body;



        if(color)variant.color = color;
            
        if(size)variant.size = size;

        if(price)variant.price = price;

        if(stock)variant.stock = stock;

        if(sku) variant.sku = sku;

        // images updated  setup

        if(req.files && req.files.length>0){
                const images = req.files.map(
                    (file)=>file.filename
                );

                variant.images = images;
        };

        await variant.save();

        res.status(200).json({
            success:true,
            message:"variant updated SuccessFully",
        })

    }catch(err){
        res.status(500).json({
            success:true,
            message:err.message,
        });
    };
};




const deleteVariant = async (req, res) => {

    try {

        const variant = await ProductVariant.findById(

            req.params.variantId

        );


        if (!variant) {

            return res.status(404).json({

                success: false,

                message: "Variant not found",

            });

        }


        // SELLER OWNERSHIP CHECK
        if (

            variant.seller.toString()

            !==

            req.user._id.toString()

        ) {

            return res.status(403).json({

                success: false,

                message: "Unauthorized access",

            });

        }


        // GET ALL PRODUCT VARIANTS
        const variants = await ProductVariant.find({

            product: variant.product,

        });


        // PREVENT LAST VARIANT DELETE
        if (variants.length === 1) {

            return res.status(400).json({

                success: false,

                message: "Cannot delete last variant",

            });

        }


        // IF DEFAULT VARIANT
        if (variant.isDefault) {

            // FIND ANOTHER VARIANT
            const anotherVariant = await ProductVariant.findOne({

                product: variant.product,

                _id: { $ne: variant._id },

            });


            // SET NEW DEFAULT
            anotherVariant.isDefault = true;

            await anotherVariant.save();


            // UPDATE PRODUCT
            await Product.findByIdAndUpdate(

                variant.product,

                {

                    defaultVariant: anotherVariant._id,

                }

            );

        }


        // DELETE VARIANT
        await variant.deleteOne();


        res.status(200).json({

            success: true,

            message: "Variant deleted successfully",

        });

    } catch (err) {

        res.status(500).json({

            success: false,

            message: err.message,

        });

    }

};



module.exports = {

    createVariant,

    getProductVariants,

    setDefaultVariant,

     updateVariant,

     deleteVariant,

};