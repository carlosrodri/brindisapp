const mongoose = require('mongoose');
const { Schema } = mongoose;

const shopSchema = new Schema({
    mail: {type: String, required: true},
    name: {type: String, required: true},
    nickname: {type: String, required: true},
    description: {type: String, required: true},
    officeHours: {type: [Number], required: true},
    lat: Number,
    lon: Number,
    barKind: String,
    qualificationList: [Number],
    likeList:[String],
    direction:{type: String, required: true},
    city: {type: String, required: true},
    imageUrl: {type: String, required: true},
    phoneToken: {type: String, required: true},
    openHour: {type: Date, required: true},
    closeHour: {type: Date, required: true},
    phone: {type: String, required: true}
});

module.exports = mongoose.model('Shop', shopSchema);