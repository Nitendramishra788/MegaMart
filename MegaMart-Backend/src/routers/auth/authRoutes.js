

const {
    signUp,
    login
} = require('../../controllers/auth/authController');

const express = require('express');

const router = express.Router();

// Register a new user

// user sign up
router.post('/signup' , signUp);
// Login user
router.post('/login' , login);

module.exports = router;