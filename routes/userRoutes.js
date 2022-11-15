const express = require('express');
const router = express.Router();
const { signUp, logIn, getToken } = require('../controllers/userController')

router.post('/signup', signUp);
router.post('/login', logIn);
router.post('/gettoken', getToken)

module.exports = router;