const Product = require("../../models/Product");
const apiErrr = require("../../utils/apiErrr");
const asyncHandler = require("../../utils/asyncHandler");

// get pending product 

const getPendingProduct  = asyncHandler( async(req, res)=>{
  

        const products = await  Product.find({
            status:"pending",
        })

        .populate("seller" , "name email")
        .populate("store" , "storeName")
        .populate("defaultVariant")
        .sort({ createdAt: -1 });


        if(products.length === 0){
            throw new apiErrr(
                404,
                "product not available yet ..!"
            );
          
        }

        res.status(200).json({
            success:true,
            message:"product fetching",
            count:products.length,
            products
        });
        

        


    
});

// give approval product 

const approvedProduct = asyncHandler(async(req , res)=>{
   
        const product = await Product.findById(
            req.params.id,
        )

        if(!product){
            throw new apiErrr(
                404,
                "product not found...!"
            )

            
        }

        if(product.status !== "pending"){
          throw new apiErrr(
              400,
            "Product already processed"
          )
        }

        product.status = "approved"

        await product.save();

        res.status(200).json({
            success:true,
            message:"product approved successFull",
            product
        })
   
});


// Reject approval request 

const rejectedProduct = asyncHandler(async(req, res)=>{
  
        const product = await Product.findById(
            req.params.id
        )

        if(!product){

            throw new apiErrr(
                404,
                "product not found yet ..!!"
            )
        
        }

       if(product.status !== "pending"){
   throw new apiErrr(400, "Product already processed");
}

        product.status = "rejected";

         await  product.save();

         res.status(200).json({
            success:true,
            message:"product rejected",
            product
         })

   
});


module.exports = {
    getPendingProduct,
    approvedProduct,
    rejectedProduct,

}