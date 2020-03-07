const mongoose = require('mongoose')
const { Schema } = mongoose

const interestedSchema = new Schema({
    user: String,
    event: String
})

module.exports = mongoose.model('Interested', interestedSchema)