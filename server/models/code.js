const mongoose = require('mongoose');
const { Schema } = mongoose;

const codeSchema = new Schema({
    code: {type: String, required: true},
    val: {type: Boolean, required: true}
});

module.exports = mongoose.model('Code', codeSchema);