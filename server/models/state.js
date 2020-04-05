const mongoose = require('mongoose');
const { Schema } = mongoose;

const stateSchema = new Schema({
    date: { type: Date, required: true },
    description: { type: String, required: true },
    userMail: { type: String, required: true },
    nickname: { type: String, required: true },
    shopId: { type: String, required: true},
    ininthour: Date,
    statusImg: String,
    avatarImg: String,
    likeList: [Number],
    dontLikeList: [Number]

});

module.exports = mongoose.model('State', stateSchema);