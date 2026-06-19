const sanitizeUser = (user)=>{
    return{
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
    };
};

module.exports= sanitizeUser;