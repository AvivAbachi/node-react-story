const express = require('express');
const router = express.Router();
const post = require('../controllers/post.controller');
const { validator } = require('../middleware/');

router.get('/', validator.postAll, post.getAll);
router.get('/:id', validator.postId, post.getByPostId);
router.get('/user/:id', validator.postUserId, post.getByUserId);
router.post('/', validator.createPost, post.create);
router.put('/', validator.updatePost, post.update);
router.delete('/', validator.deletePost, post.delete);

module.exports = router;
