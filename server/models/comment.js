const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
    date: { type: Date, required: true },
    description: { type: String, required: true },
    userMail: { type: String, required: true },
    shopId: { type: String, required: true}
});

module.exports = mongoose.model('Comment', commentSchema);