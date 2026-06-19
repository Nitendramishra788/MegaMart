const User = require("../../models/User");
const generateToken = require('../../utils/generateToken');

const bcrypt = require('bcryptjs');

const asyncHandler = require("../../utils/asyncHandler");
const apiErrr = require("../../utils/apiErrr")
const sanitizeUser = require("../../utils/sanitizeUser");


// Register a new user

const signUp =  asyncHandler( async (req , res)=>{
    const {name , email , password}= req.body;

    
        // Check if user already exists
        const userExists = await User.findOne({email});

        if(userExists){
            throw new apiErrr(
                400,
                "User already exists"
            )
           
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password , 10);

        // Create a new user

        const user = await User.create({
            name,
            email,
            password:hashedPassword,
        });

      res.status(201).json({
        success:true,
        message:"sign up successful",
        token:generateToken(user._id),
        user:sanitizeUser(user),
      });  
   
});


// login user

const login =  asyncHandler( async (req , res)=>{
    const {email , password } = req.body;

    
        const user = await User.findOne({email});

        if(!user){

            throw new apiErrr(
                400,
                "invalid email or password"
            );
            
        };

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

       if(!isMatch){

        throw new apiErrr(
            400,
            "invalid email or password"
        );
       
       };

       res.status(200).json({
        success:true,
        message:"login successful",
        token:generateToken(user._id),
        user: sanitizeUser(user),
       })



});


// get user profile
const getMe = async (req, res) => {

  res.status(200).json({
    success: true,
    message: "User profile fetched successfully",
    user: sanitizeUser(req.user),
  });

};




module.exports = {
    signUp,
    login,
    getMe   
}