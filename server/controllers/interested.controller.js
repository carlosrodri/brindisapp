const Interested = require('../models/interested')
const interestedController = {}
const verifyToken = require('./verifyToken')
const User = require('../models/user')

interestedController.getInteresteds = async (req, res) =>{
    const interested = await Interested.find()
    res.json({
        interested: interested
    })
}

interestedController.getInterestedByUser = async (req, res) => {
    const fav = await Interested.find({
        user: req.params.mail
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
    const interested = await Interested.find({
        event: req.params.event
    })
    if (interested[0] === undefined) {
        await res.json({
            status: 'error',
            message: 'No hay interesados en tu evento'
        })
    } else {
        await res.status(200).json({
           interested: interested
        })
    }
}

interestedController.addInterested = async (req, res) => {
        const interested = new Interested(req.body);
        await interested.save();
        res.json({
            status: 'succes',
            message: 'Te interesa este evento'
        })
}

module.exports = interestedController