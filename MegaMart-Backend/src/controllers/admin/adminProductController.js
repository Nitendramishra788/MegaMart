const Product = require("../../models/Product");

// get pending product 

const getPendingProduct = async(req, res)=>{
    try{

        const products = await  Product.find({
            status:"pending",
        })

        .populate("seller" , "name ,email")
        .populate("store" , "storeName")
        .populate("defaultVariant")
        .sort({ createdAt: -1 });

        res.status(200).json({
            success:true,
            message:"product fetching",
            count:products.length,
            products
        });
        

        if(!products){
            res.status(404).json({
                success:false,
                message:"product available yet"
            })
        }




    }catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        });
    }
}

// give approval product 

const approvedProduct = async(req , res)=>{
    try{
        const product = await Product.findById(
            req.params.id,
        )

        if(!product){
            res.status(404).json({
                success:true,
                message:"product not found"
            })
        }

        product.status = "approved"

        await product.save();

        res.status(200).json({
            success:true,
            message:"product approved successFull",
            product
        })
    }catch(err){
        res.status(500).json({
            success:false,
            message:err.message,
        })
    }
}


// Reject approval request 

const rejectedProduct = async(req, res)=>{
    try{
        const product = await Product.findById(
            req.params.id
        )

        if(!product){
            res.status(404).json({
                success:false,
                message:"product not found",
            })
        }

        product.status = "rejected";

         await  product.save();

         res.status(200).json({
            success:true,
            message:"product rejected",
            product
         })

    }catch(err){
        res.status(500).json({
            success:false,
            message:err.message,
        })
    }
}


module.exports = {
    getPendingProduct,
    approvedProduct,
    rejectedProduct,

}