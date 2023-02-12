import express from 'express';
const router = express.Router();
import * as post from '../controllers/post.controller';
import validator from '../middleware/';

router.get('/', validator.postAll, post.getAll);
router.get('/:id', validator.postId, post.getByPostId);
router.get('/user/:id', validator.postUserId, post.getByUserId);
router.post('/', validator.createPost, post.create);
router.put('/', validator.updatePost, post.update);
router.delete('/', validator.deletePost, post.remove);

export default router;
