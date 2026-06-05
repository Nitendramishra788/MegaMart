const User = require("../../models/User");
const generateToken = require('../../utils/generateToken');

const bcrypt = require('bcryptjs');

// Register a new user

const signUp = async (req , res)=>{
    const {name , email , password}= req.body;

    try{
        // Check if user already exists
        const userExists = await User.findOne({email});

        if(userExists){
            return res.status(400).json({
                success:false,
                message:"User already exists"

            });
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
        user,
      });  
    }catch(err){
        res.status(500).json({
            success:false,
            error:err.message
        })
    }
};


// login user

const login = async (req , res)=>{
    const {email , password } = req.body;

    try{
        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({
                success:false,
                message:"invalid email or password"
            })
        };

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

       if(!isMatch){
        return res.status(400).json({
            success:false,
            message:"invalid email or password"
        })
       };

       res.status(200).json({
        success:true,
        message:"login successful",
        token:generateToken(user._id),
        user,
       })
}catch(err){
    res.status(500).json({
        success:false,
        error:err.message
    })
}

}


// get user profile
const getMe = async (req, res) => {

  res.status(200).json({
    success: true,
    user: req.user,
  });

};




module.exports = {
    signUp,
    login,
    getMe   
}