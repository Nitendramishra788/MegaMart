const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const asyncHandler = require("../../utils/asyncHandler");
const apiErrr = require("../../utils/apiErrr");
const sanitizeUser = require("../../utils/sanitizeUser");

const updateProfile = asyncHandler( async (req, res) => {
   
        const user = await User.findById(req.user._id);

        // if user is not found
        if (!user) {

            throw new apiErrr(
                404,
                "User Not Found"
            );
           
        };

        // update the user profile

        user.name = req.body.name || user.name;
        user.number = req.body.number || user.number;

        // if(user.avatar ){
        //     user.avatar = req.body.avatar || user.avatar;
        // }

        if (req.file) {
            user.avatar = req.file.filename;
        }

        const updatedUser = await user.save();

        res.status(200).json({
            success: true,
            message: "profile updated successfully",
            user: sanitizeUser(updatedUser),
        });

   
});


// change password function

const changePassword = asyncHandler( async (req, res) => {
   
        const { oldPassword, newPassword } = req.body;

        const user = await User.findById(req.user._id);
        // if user is not found
        if (!user) {
            throw new apiErrr(
                404,
                "User Not Found"
            );
           
        };

        // isMatch old password
        const isMatch = await bcrypt.compare(
            oldPassword,
            user.password
        )

        // if old password does not match

        if (!isMatch) {
            throw new apiErrr(
                400,
                "Old password is incorrect"
            )
           
        }

        // if new password is same as old password

        if (oldPassword === newPassword) {
            throw new apiErrr(
                400,
                "New password must be different from old password"
            );
             
        };

        // hash new password
        const hashedPassword = await bcrypt.hash(
            newPassword,
            10,
        )

        // update password
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({
            success: true,
            message: "password changed successfully",

        })

   
});


// add multiple addresses function

const addAddress = asyncHandler( async (req, res) => {
   
        const user = await User.findById(req.user._id);

        // if user is not found
        if (!user) {
            throw new apiErrr(
                404,
                "User Not Found"
            )
            
        }

        const { fullName, phone, pincode, city, state, country, addressLine , isDefault } = req.body;

        // default address
        if(isDefault){
            user.addresses.forEach((address)=>{
                address.isDefault = false;
            })
        };


        const newAddress = {
            fullName,
            phone,
            pincode,
            city,
            state,
            country,
            addressLine,
            isDefault,
        };

        user.addresses.push(newAddress);

        await user.save();

        res.status(200).json({
            success: true,
            message: "Address added successfully",
            addresses: user.addresses,
        });





});


module.exports = {
    updateProfile,
    changePassword,
    addAddress,
}