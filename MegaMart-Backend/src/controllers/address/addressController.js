const Address = require("../../models/Address");
const asyncHandler = require("../../utils/asyncHandler");
const apiErrr = require("../../utils/apiErrr");
const User = require("../../models/User");


const createAddress = asyncHandler(
    async (req, res) => {

        // user check
        const userId = req.user?._id;
        if (!userId) {
            throw new apiErrr(
                404,
                "Unauthorized user"
            )
        };

        // request body read
        const {
            fullName,
            phone,
            addressLine1,
            addressLine2,
            landmark,
            city,
            state,
            country,
            pincode,
            addressType,
            isDefault,
        } = req.body;

        // validate all requied feild fulfil or not 
        if (
            !fullName ||
            !phone ||
            !addressLine1 ||
            !city ||
            !state ||
            !country ||
            !pincode
        ) {
            throw new apiErrr(400, "Required fields are missing");
        }

        // CHECK Address count 
        const addressCount = await Address.countDocuments({
            user: userId
        });

        // validation of default case 
        const shouldBeDefault = addressCount === 0 ? true : !!isDefault;

        //   if user send multipale default then it will handle 
        if (shouldBeDefault) {
            await Address.updateMany(
                { user: userId },
                { isDefault: false }
            );
        }

        const address = await Address.create({
            user: userId,
            fullName,
            phone,
            addressLine1,
            addressLine2,
            landmark,
            city,
            state,
            country,
            pincode,
            addressType: addressType || "home",
            isDefault: shouldBeDefault
        });

        res.status(201).json({
            success: true,
            message: "Address created successfully",
            address
        });

    }
);


module.exports = {
    createAddress,
}