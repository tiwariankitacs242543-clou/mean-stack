const express = require('express');
const router = express.Router();
// Ensure you have imported resetPassword here
const { 
    registerUser, 
    loginUser, 
    forgotPassword, 
    resetPassword 
} = require('../controllers/authController');

router.post('/register', registerUser);
router.post('/login', loginUser);

// Route for requesting a password reset email
router.post('/forgot-password', forgotPassword);

// Route for submitting the token and new password
router.post('/reset-password', resetPassword);

module.exports = router;