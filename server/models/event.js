const mongoose = require('mongoose');
const { Schema } = mongoose;

const eventSchema = new Schema({
    date: {type: String, required: true},
    description: {type: String, required: true},
    name: {type: String, required: true},
    cover: String,
    shop: {type: String, required: true},
    initHour: {type: String},
    city: String
});

module.exports = mongoose.model('Event', eventSchema);