const Interested = require('../models/interested')
const interestedController = {}
const verifyToken = require('./verifyToken')
const User = require('../models/user')

interestedController.getInterestedByUser = async (req, res) => {
    const {
        user
    } = req.body
    const fav = await Interested.find({
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

interestedController.getInterestedByEvent = async (req, res) => {
    const {
        shop
    } = req.body
    const interested = await Interested.find({
        shop
    })
    if (!interested) {
        await res.json({
            status: 'error',
            message: 'No hay interesados en tu evento'
        })
    } else {
        await res.status(200).json({
            interested
        })
    }
}

interestedController.addInterested = async (req, res) => {
    const user = await User.findById(req.userId, {
        password: 0
    })
    if (!user) {
        res.json({
            status: 'error',
            'message': ' Debes iniciar sesión para realizar esta accion '
        })
    } else {
        const interested = new Interested(req.body);
        await interested.save();
        res.json({
            status: 'succes',
            message: 'Te interesa este evento'
        })
    }
}

module.exports = interestedController