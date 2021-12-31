const express = require('express');
const router = express.Router();
const user = require('../controllers/user.controller');
const { token, errorHandel, verifyUser } = require('../middleware/');

router.post('/singup', verifyUser.signup, errorHandel, user.singup);
router.post('/login', verifyUser.login, errorHandel, user.login);
router.post('/reset', verifyUser.reset, errorHandel, user.reset);
router.post('/access', token, user.access);
router.post('/logout', token, user.logout);
router.put('/update', token, user.update);

module.exports = router;
