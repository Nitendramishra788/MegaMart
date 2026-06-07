const User = require("../../models/User");



// user apply for the seller 

const applySeller = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        // user alreay seller 

        if (user.role == "seller") {
            return res.status(400).json({
                success: false,
                message: "Your are alrady seller"
            })
        }

        // admin can not apply 
        if (user.role === "admin") {
            return res.status(400).json({
                success: false,
                message: "Admin cannot apply for seller",
            });
        }

        // user alrady pending for the seller

        if (user.sellerRequestStatus == "pending") {
            return res.status(400).json({
                success: false,
                message: "Your seller request is pending"
            })
        }

        // update the user seller request status to pending

        user.sellerRequestStatus = "pending";

        await user.save();

        res.status(200).json({
            success: true,
            message: "Seller request sent successfully"

        })


    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        })
    }
}

module.exports = {
    applySeller,
}