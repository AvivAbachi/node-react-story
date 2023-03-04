import express from 'express';

import * as post from '../controllers/post.controller';
import { auth, validators } from '../middleware';

const router = express.Router();
router.get('/', validators.postAll, post.getAll);
router.get('/:postId', validators.postId, post.getByPostId);
router.get('/user/:userId', validators.postUserId, post.getByUserId);
router.post('/', auth.IsJWTAuth, validators.createPost, post.create);
router.put('/:postId', auth.IsJWTAuth, validators.updatePost, post.update);
router.delete('/:postId', auth.IsJWTAuth, validators.postId, post.remove);

export default router;
