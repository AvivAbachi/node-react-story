const express = require('express');
const router = express.Router();
const post = require('../controllers/post.controller');
const { token, errorHandel, verifyPost, namePost } = require('../middleware/');

router.get('/', post.getAll, namePost);
router.get('/post/:id', post.getByPostId, namePost);
router.get('/user/:id', post.getByUserId, namePost);
router.post('/', token, verifyPost.create, errorHandel, post.create);
router.put('/', token, verifyPost.update, errorHandel, post.update);
router.delete('/', token, verifyPost.delete, errorHandel, post.delete);

module.exports = router;
