const express = require('express');
const router = require("express").Router();
const protect = require("../../middlewares/authMiddleware");

const {
   updateProfile,
    changePassword,
} = require('../../controllers/user/profileController');



router.put('/update' , protect , updateProfile);
router.put('/change-password' , protect , changePassword);


module.exports = router;