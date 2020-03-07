const Attend = require('../models/attend')
const attendController = {}
const verifyToken = require('./verifyToken')
const User = require('../models/user')

attendController.getAttendByUser = async (req, res) => {
    const {
        user
    } = req.body
    const fav = await Attend.find({
        user: user
    })
    if (!fav) {
        res.json({
            status: 'error',
            message: 'No tienes asistidos activos'
        })
    } else {
        res.status(200).json({
            fav
        })
    }
}

attendController.getAttendByEvent = async (req, res) => {
    const {
        shop
    } = req.body
    const attend = await Attend.find({
        shop
    })
    if (!attend) {
        await res.json({
            status: 'error',
            message: 'No hay asistentes en tu evento'
        })
    } else {
        await res.status(200).json({
            attend
        })
    }
}

attendController.addAttend = verifyToken, async (req, res) => {
    const user = await User.findById(req.userId, {
        password: 0
    })
    if (!user) {
        res.json({
            status: 'error',
            'message': ' Debes iniciar sesión para realizar esta accion '
        })
    } else {
        const attend = new Attend(req.body);
        await attend.save();
        res.json({
            status: 'succes',
            message: 'Asistirás al evento'
        })
    }
}

module.exports = attendController