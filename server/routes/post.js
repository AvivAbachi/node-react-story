const express = require('express');
const router = express.Router();
const post = require('../controllers/post.controller');
const { token, errorHandel, verifyPost } = require('../middleware/');

router.get('/', post.getAll);
router.get('/post/:id', post.getByPostId);
router.get('/user/:id', post.getByUserId);
router.post('/', token, verifyPost.create, errorHandel, post.create);
router.put('/', token, verifyPost.update, errorHandel, post.update);
router.delete('/', token, verifyPost.delete, errorHandel, post.delete);

module.exports = router;
