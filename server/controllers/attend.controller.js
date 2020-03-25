const Attend = require('../models/attend')
const attendController = {}
const verifyToken = require('./verifyToken')
const User = require('../models/user')

attendController.getAttendByUser = async (req, res) => {

    const fav = await Attend.find({
        user: req.params.mail
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
        event: req.params.event
    })
    if (attend[0] === undefined) {
        await res.json({
            status: 'error',
            message: 'No hay asistentes al evento'
        })
    } else {
        await res.status(200).json({
           attends: attend
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