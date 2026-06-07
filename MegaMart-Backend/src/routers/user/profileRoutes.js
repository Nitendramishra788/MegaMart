const express = require('express');
const router = require("express").Router();
const protect = require("../../middlewares/authMiddleware");
const upload = require("../../middlewares/uploadMiddleware");

const {
    updateProfile,
    changePassword,
    addAddress,
} = require('../../controllers/user/profileController');



router.put('/update',
     protect,
    upload.single("avatar"),
    updateProfile);

    
router.put('/change-password', protect, changePassword);

router.post('/add-address' , protect , addAddress);


module.exports = router;