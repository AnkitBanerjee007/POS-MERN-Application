const express = require('express');
const { loginController,registerController } = require('../controllers/userController');

const router = express.Router();


// Routes

// Method - POST /login
router.post('/login',loginController)

// Methos - POST /register
router.post('/register',registerController)


module.exports = router