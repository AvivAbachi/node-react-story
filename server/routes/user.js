const express = require('express');
const router = express.Router();
const user = require('../controllers/user.controller');
const { errorResult, verify } = require('../middleware/');

router.post('/singup', verify.signUp, errorResult, user.singup);
router.post('/login', verify.login, errorResult, user.login);
router.post('/reset', verify.reset, errorResult, user.reset);
router.post('/access', verify.token, user.access);
router.post('/logout', verify.token, user.logout);
router.put('/update', verify.token, user.update);

module.exports = router;
