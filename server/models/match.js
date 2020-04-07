const mongoose = require('mongoose')
const { Schema } = mongoose

const matchSchema = new Schema({
    shopId: {type: String, required: true},
    userMail: {type: String, required: true},
    userName: {type: String, required: true},
    date: {type: Date, required: true}
})

module.exports = mongoose.model('Match', matchSchema)