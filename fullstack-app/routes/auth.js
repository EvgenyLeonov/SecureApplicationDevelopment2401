const express = require('express');
const router = express.Router();

const authController = require("../controllers/authController");

router.get('/signup', authController.getSignup);

router.post('/signup', authController.postSignup);

router.post('/logout', authController.postLogout);

module.exports = router;