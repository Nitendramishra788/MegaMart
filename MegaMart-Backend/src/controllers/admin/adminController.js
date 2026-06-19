const User = require("../../models/User");
const asyncHandler = require("../../utils/asyncHandler");
const apiErrr = require("../../utils/apiErrr");

// get the all seller request 

const getSellerRequests = asyncHandler(async (req, res) => {

    const request = await User.find({
        sellerRequestStatus: "pending",
    }).select("-password");

    res.status(200).json({
        success: true,
        request
    })

});

// aprovel request 

const approveSeller = asyncHandler(async (req, res) => {


    const user = await User.findById(req.params.id);

    if (!user) {
        throw new apiErrr(
            404,
            "User not found..!"
        )

    }

    if (user.sellerRequestStatus !== "pending") {
        throw new apiErrr(
            400,
            "Request already processed"
        );
    }

    user.role = "seller";
    user.sellerRequestStatus = "approved";

    await user.save();

    res.status(200).json({
        success: true,
        message: "seller approved successfully",
    })


});


// approvel rejected 

const rejectedSeller = asyncHandler(async (req, res) => {

    const user = await User.findById(req.params.id);

    if (!user) {
        throw new apiErrr(
            404,
            "User not found...!"
        )

    }


    user.sellerRequestStatus = "rejected";
    await user.save();

    res.status(200).json({
        success: true,
        message: "seller request rejected",
    })

});


module.exports = {
    getSellerRequests,
    approveSeller,
    rejectedSeller
}