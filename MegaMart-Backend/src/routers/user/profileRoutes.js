const express = require('express');
const router = require("express").Router();
const protect = require("../../middlewares/authMiddleware");

const {
   updateProfile,
} = require('../../controllers/user/profileController');



router.put('/update' , protect , updateProfile);

module.exports = router;