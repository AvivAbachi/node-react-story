const express = require('express');
const router = express.Router();
const post = require('../controllers/post.controller');
const { errorResult, verifyPost, verify } = require('../middleware/index');

router.get('/', post.getAll);
router.get('/post/:id', post.getByPostId);
router.get('/user/:id', post.getByUserId);
router.post('/', verify.token, verifyPost.create, errorResult, post.create);
router.put('/', verify.token, verifyPost.update, errorResult, post.update);
router.delete('/', verify.token, verifyPost.delete, errorResult, post.delete);

module.exports = router;
