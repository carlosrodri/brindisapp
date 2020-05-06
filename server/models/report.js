const mongoose = require ('mongoose')
const { Schema } = mongoose

const reportSchema = new Schema({
    user: {type: String, required: true},
    description: {type: String, required: true},
    shop: {type: String, required: true},
})

module.exports = mongoose.model('Report', reportSchema)