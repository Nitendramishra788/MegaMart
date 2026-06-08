const seller = async(req , res , next)=>{
   try{

     if(req.user && req.user.role==="seller"){
        next();
    }

    else{
        res.status(403).json({
            success:true,
            message:"seller access only"
        })
    }

   }catch(err){
    res.status(500).json({
        success:false,
        message:err.message,
    })
   }
}



module.exports = {
  seller,
};