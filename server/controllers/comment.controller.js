const Comment = require('../models/Comment');
const commentController = {};

commentController.getComments = async (req, res) => {
    const comments = await Comment.find();
    res.json(comments);
}

commentController.createComment = async (req, res) => {
    const comment = new Comment(req.body);
    await comment.save();
    console.log(comment);
    res.json({
        'status': 'usuario guardado'
    });
}

commentController.getCommentbyMail = async (req, res) => {
    console.log(req.params.mail);
    
    const comment = await Comment.find( {'mail': req.params.mail} );
    res.json(comment);
    console.log(comment);
    
}

commentController.deleteComment = async (req, res) => {
    await Comment.findByIdAndDelete(req.params.id);
    res.json({status: 'Comment deleted'});
}

commentController.editComment = async (req, res) => {
    const CommentUpdated = {
        name: req.body.name,
        nickname: req.body.nickname,
        password: req.body.password
    }
    await Comment.findByIdAndUpdate(req.params.id, { $set: commentUpdated }, { new: true });
    res.json({ status: 'Comments Updated' });
}

module.exports = commentController;