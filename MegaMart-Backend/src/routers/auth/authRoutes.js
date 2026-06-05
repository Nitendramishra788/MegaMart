// const authController = require('../../controllers/auth/authController');

const {
    signUp,
} = require('../../controllers/auth/authController');

const express = require('express');

const router = express.Router();

// Register a new user

router.post('/signup' , signUp);

module.exports = router;