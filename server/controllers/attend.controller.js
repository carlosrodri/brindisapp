const Attend = require('../models/attend')
const attendController = {}
const verifyToken = require('./verifyToken')
const User = require('../models/user')

attendController.getAttendByUser = async (req, res) => {
 
    const fav = await Attend.find({
        user: req.body.mail
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
    const attend = await Attend.find({
        event: req.params.eventId
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

attendController.addAttend = async (req, res) => {
    const attend = new Attend(req.body);
    await attend.save();
    res.json({
        status: 'succes',
        message: 'Asistirás al evento'
    })
}

module.exports = attendController