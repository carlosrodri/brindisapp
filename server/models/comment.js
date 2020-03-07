const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
    id: { type: String, required: true },
    date: { type: Date, required: true },
    hour: { type: String, required: true },
    user: { type: String, required: true },
    shop: { type: String, required: true}
});

module.exports = mongoose.model('Comment', commentSchema);