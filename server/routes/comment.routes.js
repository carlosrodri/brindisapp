const express = require('express');
const router = express.Router();

const comment = require('../controllers/comment.controller');

router.get('/', comment.getComments) ;
router.post('/', comment.createComment);
router.get('/mail/:mail', comment.getCommentbyMail);
router.get('/shop/:shop', comment.getCommentsByShop)
router.put('/:id', comment.editComment);
router.delete('/:id', comment.deleteComment);

module.exports = router;