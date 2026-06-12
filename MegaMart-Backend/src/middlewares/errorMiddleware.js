const { Types } = require("mongoose");

const errorHandler = (
  err , req , res , next
)=>{
  let statusCode = err.statusCode ||500;

  let message = err.message || "Internal Server Error";

  // mongoose Invalid ObjectID 

  if (err.name === "CastError"){
    statusCode=400;
    message= `Invaild ${err.path}`;
  }

//  typing err 

if(err instanceof TypeError){
  statusCode=500;
  message= "Type Error" + err.message;
}

// Duplicate key err

if (err.code === 11000){
  statusCode=400;
  message = `${Object.keys(err.keyValue)}already exists`
}

// Mongoose validation error

if(err.name === "ValidationError"){
  statusCode=400;
  message= Object.values(err.errors)

  .map((val) => val.message)
      .join(", ");
}

//  console.error(err);

//  Final response

res.status(statusCode).json({
  success: false,
  message,

  stack:
    process.env.NODE_ENV ===
    "development"
      ? err.stack
      : null,
});

}
module.exports = errorHandler;