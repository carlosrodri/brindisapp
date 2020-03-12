const Event = require('../models/event');
const eventController = {};
const User = require('../models/user')


eventController.getEvents = async (req, res) => {
    const events = await Event.find();
    res.json(events);
}

eventController.getEventById = async (req, res) => {
    const event = await Event.find({
        '_id': req.params.id
    });
    res.json({
        event: event
    });
}

eventController.createEvent = async (req, res) => {
    const event = new Event(req.body);
    await event.save();
    res.json({
        status: 'succes',
        message: ' un evento nuevo ha sido creado '
    })
}

eventController.deleteEvent = async (req, res) => {
    await Event.findByIdAndDelete(req.params.id);
    res.json({
        'status': 'deleted'
    });
}

eventController.updateEvent = async (req, res) => {
    const eventUpdated = new Event({
        date: req.body.date,
        description: req.body.description,
        name: req.body.name,
        initHour: req.body.initHour,
    });
    await Event.findByIdAndUpdate(req.parms.id, {
        $set: eventUpdated
    }, {
        new: true
    });
    res.json({
        'status': 'updated'
    });
}

eventController.getEventsByShop = async (req, res) => {
    const events = await Event.find({
        'shop': req.parms.shop
    });
    res.json(events);
}

eventController.getEventsByCity = async (req, res) => {
    console.log(req.params.city + '   city');
    console.log(new Date("<YYYY-mm-ddTHH:MM:ss>") + "");


    Event.find({
        date: new Date()
        /*
        $and: [{
            city: req.params.city
        }, {
            date: {
                $gte: new Date()
            }
        }]*/
    }, (err, actividad) => {
        if (err) {
            console.log(err.message);
            res.json({
                message: 'No hay eventos próximos en esta ciudad'
            })
        }
        if (!actividad) { // si no se consiguen documentos
            res.json({
                message: 'No hay eventos próximos en esta ciudad'
            })
        }
        res.json({
            events: actividad
        });
    });
}

module.exports = eventController;