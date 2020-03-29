const mongoose = require('mongoose')
const { Schema } = mongoose;

const attendSchema = new Schema({
    user: String,
    event: String,
    city: String
})

module.exports = mongoose.model('Attend', attendSchema)