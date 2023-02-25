import express from 'express';

import * as user from '../controllers/user.controller';
import { auth, validators } from '../middleware';

const router = express.Router();
router.post('/signup', validators.signup, user.signup);
router.post('/login', auth.IsLocalAuth, user.login);
router.post('/reset', auth.IsResetAuth, user.reset);
router.post('/access', auth.IsJWTAuth, user.access);
router.post('/logout', auth.IsJWTAuth, user.logout);
router.put('/update', auth.IsJWTAuth, validators.update, user.update);

export default router;
