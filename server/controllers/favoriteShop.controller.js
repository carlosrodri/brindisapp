const FavoriteShop = require('../models/favoriteShop')
const favoriteController = {}
const verifyToken = require('./verifyToken')
const User = require('../models/user')

favoriteController.getFavoriteByUser = async (req, res) => {
    const {
        user
    } = req.body
    const fav = await FavoriteShop.find({
        user: user
    })
    if (!fav) {
        res.json({
            status: 'error',
            message: 'No tienes favoritos activos'
        })
    } else {
        res.status(200).json({
            fav
        })
    }
}

favoriteController.getFavoriteByEvent = async (req, res) => {
    const {
        shop
    } = req.body
    const favorite = await FavoriteShop.find({
        shop
    })
    if (!favorite) {
        await res.json({
            status: 'error',
            message: 'No hay asistentes en tu evento'
        })
    } else {
        await res.status(200).json({
            favorite
        })
    }
}

favoriteController.addFavorite = verifyToken, async (req, res) => {
    const user = await User.findById(req.userId, {
        password: 0
    })
    if (!user) {
        res.json({
            status: 'error',
            'message': ' Debes iniciar sesión para realizar esta accion '
        })
    } else {
        const favorite = new FavoriteShop(req.body);
        await favorite.save();
        res.json({
            status: 'succes',
            message: 'Asistirás al evento'
        })
    }
}

module.exports = favoriteController