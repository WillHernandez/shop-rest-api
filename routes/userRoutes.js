const express = require('express');
const router = express.Router();
const { signUp, logIn } = require('../controllers/userController')

router.post('/', signUp);
router.get('/', logIn);

module.exports = router;