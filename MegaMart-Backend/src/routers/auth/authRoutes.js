
const protect = require("../../middlewares/authMiddleware");
const {
    signUp,
    login,
    getMe
} = require('../../controllers/auth/authController');

const express = require('express');

const router = express.Router();

// Register a new user

// user sign up
router.post('/signup' , signUp);
// Login user
router.post('/login' , login);

// Get current user
router.get("/me", protect, getMe);

module.exports = router;