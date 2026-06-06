const User = require("../../models/User");

const updateProfile = async (req, res)=>{
    try{
        const user = await User.findById(req.user._id);

        // if user is not found
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User Not Found",

            })
        }

        // update the user profile

        user.name = req.body.name || user.name;
        user.number = req.body.number || user.number;
        
        if(user.avatar ){
            user.avatar = req.body.avatar || user.avatar;
        }

        const updatedUser = await user.save();

        res.status(200).json({
            success:true,
            message:"profile updated successfully",
            user:updatedUser,
        });

    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}


module.exports = {
    updateProfile,
}