const mongoose = require('mongoose')
const { Schema } = mongoose

const favoriteShopSchema = new Schema({
    user: String,
    shop: String
})

module.exports = mongoose.model('FavoriteShop', favoriteShopSchema)