const mongoose = require('mongoose');
const { Schema } = mongoose;

const eventSchema = new Schema({
    date: {type: String, required: true},
    description: {type: String, required: true},
    name: {type: String, required: true},
    shopImg:{type: String, required: true},
    cover: String,
    shop: {type: String, required: true},
    initHour: {type: String},
    city: String,
    imageUrl: String,
    suggested: Boolean
});

module.exports = mongoose.model('Event', eventSchema);