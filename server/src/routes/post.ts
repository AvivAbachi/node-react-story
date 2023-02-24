import express from 'express';

import * as post from '../controllers/post.controller';
import validator from '../middleware/';
import { IsJWTAuth } from '../middleware/auth';

const router = express.Router();
router.get('/', validator.postAll, post.getAll);
router.get('/:id', validator.postId, post.getByPostId);
router.get('/user/:id', validator.postUserId, post.getByUserId);
router.post('/', IsJWTAuth, validator.createPost, post.create);
router.put('/', IsJWTAuth, validator.updatePost, post.update);
router.delete('/', IsJWTAuth, validator.deletePost, post.remove);

export default router;
