const express = require('express');
const router = express.Router();
const user = require('../controllers/user.controller');
const { validator } = require('../middleware/');

router.post('/signup', validator.signup, user.signup);
router.post('/login', validator.login, user.login);
router.post('/reset', validator.reset, user.reset);
router.post('/access', validator.token, user.access);
router.post('/logout', validator.token, user.logout);
router.put('/update', validator.update, user.update);

module.exports = router;
