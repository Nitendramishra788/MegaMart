const express = require('express');
const router = require("express").Router();
const protect = require("../../middlewares/authMiddleware");
const upload = require("../../middlewares/uploadMiddleware");

const {
    updateProfile,
    changePassword,
} = require('../../controllers/user/profileController');



router.put('/update',
     protect,
    upload.single("avatar"),
    updateProfile);

    
router.put('/change-password', protect, changePassword);


module.exports = router;