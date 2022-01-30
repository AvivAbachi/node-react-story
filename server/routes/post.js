const express = require('express');
const router = express.Router();
const post = require('../controllers/post.controller');
const { token, errorHandel, verifyPost } = require('../middleware/');

router.get('/', post.getAll);
router.get('/:id', post.getByPostId);
router.get('/user/:userId', post.getByUserId);
router.post('/', token, verifyPost.create, post.create);
router.put('/', token, verifyPost.update, errorHandel, post.update);
router.delete('/', token, verifyPost.delete, errorHandel, post.delete);

module.exports = router;
