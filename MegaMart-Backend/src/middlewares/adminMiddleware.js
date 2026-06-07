const admin=(req , res , next)=>{

    try{
        if(req.user && req.user.role=="admin"){
            next();
        }

        else{
            res.status(403).json({
                success:false,
                message:"only amin can access"
            })
        }
    }catch(err){
        res.status(500).json({
            success:false,
            message:err.message,
        })
    }
};

module.exports = {
    admin,
}