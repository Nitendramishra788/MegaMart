const User = require("../../models/User");

// get the all seller request 

const getSellerRequests = async(req, res)=>{
    try{
        const request = await User.find({
            sellerRequestStatus: "pending",
        }).select("-password");

        res.status(200).json({
            success:true,
            request
        })
    }catch(err){
        res.status(500).json({
            success:false,
            message:err.message,
        })
    }
}

// aprovel request 

const approveSeller = async(req, res)=>{
    
    try{
        const user = await User.findById(req.params.id);

        if(!user){
            res.status(404).json({
                success:false,
                message:"user not found"
            })
        }

        user.role="seller";
        user.sellerRequestStatus="approved";

        await user.save();

        res.status(200).json({
            success:true,
            message:"seller approved successfully",
        })

    }catch(err){
        res.status(500).json({
            success:false,
            message:err.message,
        })
    }
}


// approvel rejected 

const rejectedSeller = async(req, res)=>{
    try{
        const user = await User.findById(req.params.id);

        if(!user){
            res.status(404).json({
                success:false,
                message:"user not found",
            })
        }

        
        user.sellerRequestStatus="rejected";
        await user.save();

        res.status(200).json({
            success:true,
            message:"seller request rejected",
        })
    }catch(err){
        res.status(500).json({
            success:false,
            messsage:err.message
        })
    }
}


module.exports = {
    getSellerRequests,
    approveSeller,
    rejectedSeller
}