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

// get address api 

const getAddress = asyncHandler(
    async (req, res) => {
        const userId = req.user?._id;

        const addresss = await Address.find({
            user: userId
        })
            .sort({ isDefault: -1, createdAt: -1 });


        res.status(200).json({
            success: true,
            message: "all addresss fetch",
            addresss,
        })

    }


);


// update address api 

const updateAddress = asyncHandler(
    async (req, res) => {
        const { addressId } = req.params;


        // check user Id and address Id

        const address = await Address.findOne({
            _id: addressId,
            user: req.user._id
        })




        if (!address) {
            throw new apiErrr(
                404,
                "Address not found..!"
            );
        };

        // extrect and update 
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

        address.fullName = fullName || address.fullName;
        address.phone = phone || address.phone;
        address.addressLine1 = addressLine1 || address.addressLine1;
        address.addressLine2 = addressLine2 || address.addressLine2;
        address.landmark = landmark || address.landmark;
        address.city = city || address.city;
        address.state = state || address.state;
        address.country = country || address.country;
        address.pincode = pincode || address.pincode;
        address.addressType = addressType || address.addressType;

        await address.save();

        res.status(200).json({
            success:true,
            message:"address updated successfuly..!",
            address,
        });
    }
);


// this this part of destroy address part 

const destroyAddress = asyncHandler(
    async(req , res)=>{
        const {addressId} = req.params;

        // find user ID
        const userId = req.user?._id;
        if(!userId){
            throw new apiErrr(
                404,
                "Unauthorized user"
            )
        };

    // check ownership 

        const address = await Address.findOne({
            _id: addressId,
            user:userId,
        });

        if(!address){
            throw new apiErrr(
                404,
                "you are not a owner...!"
            )
        };

        // delete logic

        // address count 

        const addressCount = await Address.countDocuments({
            user:userId,
        });

       if(addressCount==1){
        throw new apiErrr(
            400,
            "you cannot delete default address please add another firts..!"
        )
       };

       if(addressCount>1 && address.isDefault==true){
            throw new apiErrr(
                400,
                "please set another address deafult first..!",
            )
       };

       if(addressCount>1 && address.isDefault==false){
        await Address.findByIdAndDelete(addressId);
       };

       
       res.status(200).json({
        success: true,
        message: "address deleted successful..",
        address,
       })
}
)


module.exports = {
    createAddress,
    getAddress,
    updateAddress,
    destroyAddress,
}