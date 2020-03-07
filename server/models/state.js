const mongoose = require('mongoose');
const { Schema } = mongoose;

const stateSchema = new Schema({
    id: {type: Number, required: true},
    initHour: {type: String, required: true},
    description: {type: String, required: true},
    user: {type: String, required: true}
});

module.exports = mongoose.model('State', stateSchema);