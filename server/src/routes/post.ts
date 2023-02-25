import express from 'express';

import * as post from '../controllers/post.controller';
import { auth, validators } from '../middleware';

const router = express.Router();
router.get('/', validators.postAll, post.getAll);
router.get('/:id', validators.postId, post.getByPostId);
router.get('/user/:id', validators.postUserId, post.getByUserId);
router.post('/', auth.IsJWTAuth, validators.createPost, post.create);
router.put('/', auth.IsJWTAuth, validators.updatePost, post.update);
router.delete('/', auth.IsJWTAuth, validators.deletePost, post.remove);

export default router;
