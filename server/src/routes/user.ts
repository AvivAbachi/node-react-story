import express from 'express';

import * as user from '../controllers/user.controller';
import validator from '../middleware/';
import { IsJWTAuth, IsLocalAuth } from '../middleware/auth';

const router = express.Router();
router.post('/signup', validator.signup, user.signup);
router.post('/login', IsLocalAuth, user.login);
router.post('/reset', validator.reset, user.reset);
router.post('/access', IsJWTAuth, user.access);
router.post('/logout', IsJWTAuth, user.logout);
router.put('/update', IsJWTAuth, validator.update, user.update);

export default router;
