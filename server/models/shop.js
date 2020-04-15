const mongoose = require('mongoose');
const { Schema } = mongoose;

const shopSchema = new Schema({
    mail: {type: String, required: true},
    name: {type: String, required: true},
    nickname: {type: String, required: true},
    description: {type: String, required: true},
    officeHours: {type: String, required: true},
    lat: Number,
    lon: Number,
    barKind: String,
    qualificationList: [Number],
    direction: String,
    city: String,
    imageUrl: String,
    phoneToken: String
});

module.exports = mongoose.model('Shop', shopSchema);