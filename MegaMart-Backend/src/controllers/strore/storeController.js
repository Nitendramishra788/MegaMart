const { Schema } = require("mongoose");
const Store = require("../../models/Store");

// create store 

const createStore = async(req, res)=>{

    try{
            const {
                storeName,
                storeDescription,
            }=req.body;

            const existingStore = await Store.findOne({
                owner:req.user._id,
            });

            if(existingStore){
                res.status(400).json({
                    success:false,
                    message:"user already has store"
                })
            }

            const store = await Store.create({
                storeName,
                storeDescription,

                owner: req.user._id,

                storeLogo: req.files?.storeLogo?.[0]?.filename || "",
                storeBanner: req.files?.storeBanner?.[0]?.filename || "",

            })

            res.status(201).json({
                success:true,
                message:"Store Created successFully",
                store,
            })

    }catch(err){
        res.status(500).json({
            success:false,
            message:err.message,
        })
    }
}



// get store data 

const getMyStore = async (req, res)=>{
    try{
        const store = await Store.findOne({
            owner:req.user._id,
        }).populate("owner" , "name , email , role")

        if(!store){
            res.status(404).json({
                success:false,
                message:"store not found"
            })
        }

        res.status(200).json({
            success:true,
            message:"you data",
            store,
        })
    }catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }

    
};


// update store details

const updateStore = async(req , res)=>{
    try{
        const {
            storeName,
            storeDescription
        } = req.body;

        const store = await Store.findOne({
            owner:req.user._id,
        });

        if(!store){
           return res.status(404).json({
                success:false,
                message:"store not found"
            })
        }

        if(storeName){
            store.storeName = storeName;
        }

        if(storeDescription){
            store.storeDescription = storeDescription;
        }

        if(req.files?.storeLogo){
            store.storeLogo = 
            req.files.storeLogo[0].filename;
        }

        if(req.files?.storeDescription){
            store.storeBanner = 
            req.files.storeDescription[0].filename;
        }


        await store.save();

        res.status(200).json({
            success:true,
            message:"Store Updated successFully"
        })


    }catch(err){
        
        res.status(500).json({
            success:true,
            message:err.message,
        })
}
}

module.exports = {
    createStore,
    getMyStore,
    updateStore,
}