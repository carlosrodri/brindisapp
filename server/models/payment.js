const mongoose = require('mongoose')
const { Schema } = mongoose

const paymentSchema = new Schema({
    payDate: {type: Date, required: true},
    userMail: {type: String, required: true},
    defeat: {type: Boolean, required: true},
    proof:{type: String, required: true}
})

module.exports = mongoose.model('Payment', paymentSchema)