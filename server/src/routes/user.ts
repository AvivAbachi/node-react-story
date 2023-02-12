import express from 'express';
const router = express.Router();
import * as user from '../controllers/user.controller';
import validator from '../middleware/';

router.post('/signup', validator.signup, user.signup);
router.post('/login', validator.login, user.login);
router.post('/reset', validator.reset, user.reset);
router.post('/access', validator.token, user.access);
router.post('/logout', validator.token, user.logout);
router.put('/update', validator.update, user.update);

export default router;
