const jwt = require("jsonwebtoken");

const User = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");
const apiErrr = require("../utils/apiErrr");

const protect = asyncHandler( async  (req, res, next) => {

  let token;

  

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {

      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      const user = await User.findById(decoded.id).select("-password");
      
      if(!user){
        throw new apiErrr(
          401,
          "user not found..!"
        )
      }

      req.user = user;

      next();

    } else {
      throw new apiErrr(
        401,
        "Not authorized, no token"
      )
     

    }


});

module.exports = protect;