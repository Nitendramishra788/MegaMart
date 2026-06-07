const User = require("../../models/User");
const bcrypt = require("bcryptjs");

const updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        // if user is not found
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Not Found",

            })
        }

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
            user: updatedUser,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
};


// change password function

const changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;

        const user = await User.findById(req.user._id);
        // if user is not found
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Not Found",
            })
        }

        // isMatch old password
        const isMatch = await bcrypt.compare(
            oldPassword,
            user.password
        )

        // if old password does not match

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Old password is incorrect",
            })
        }

        // if new password is same as old password

        if (oldPassword === newPassword) {
            return res.status(400).json({
                success: false,
                message: "New password must be different from old password",

            })
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

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        })
    }
}


// add multiple addresses function

const addAddress = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        // if user is not found
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Not Found",
            })
        }

        const { fullName, phone, piccode, city, state, country, addressLine , isDefault } = req.body;

        // default address
        if(isDefault){
            user.addresses.forEach((address)=>{
                address.isDefault = false;
            })
        };


        const newAddress = {
            fullName,
            phone,
            piccode,
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



    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        })
    }


}


module.exports = {
    updateProfile,
    changePassword,
    addAddress,
}