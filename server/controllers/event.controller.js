const Event = require('../models/event');
const eventController = {};

eventController.getEvents = async (req, res) => {
    const events = await Event.find();
    res.json(events);
}

eventController.getEventById = async (req, res) => {
    const event = await Event.find({
        '_id': req.params.id
    });
    console.log(event);
    
    res.json({
        event: event
    });
}

eventController.createEvent = async (req, res) => {
    const event = new Event(req.body);
    await event.save();
    res.json({
        status: 'succes',
        message: ' un evento nuevo ha sido creado ',
        id: event._id
    })
}

eventController.deleteEvent = async (req, res) => {
    await Event.findByIdAndDelete(req.params.id);
    res.json({
        'status': 'deleted'
    });
}

eventController.updateEvent = async (req, res) => {
    console.log(req.params.id);
    console.log(req.body.imageUrl);

    const eventUpdated = new Event({
        date: req.body.date,
        description: req.body.description,
        name: req.body.name,
        cover: req.body.cover,
        shop: req.body.shop,
        initHour: req.body.initHour,
        city: req.body.city,
        imageUrl: req.body.imageUrl
    });
    await Event.findByIdAndUpdate(req.params.id, eventUpdated, (err => {
        res.json({
            'status': err
        });
    }))
}

eventController.getEventsByShop = async (req, res) => {
    const events = await Event.find({
        'shop': req.params.shop
    });
    if (events[0] === undefined) {
        res.json({
            status: 'error',
            message: 'No has creado eventos'
        })
    } else {
        res.json({
            events: events
        });
    }
}

eventController.getSuggestedByCity = async (req, res) => {
    const events = await Event.find({
        city: req.params.city,
        suggested: true
    })
    if (events === undefined || events === null || !events) {
        res.json({
            staus: 'error',
            message: 'No hay eventos el día de hoy en la ciudad seleccionada'
        })
    } else {
        res.json({
            events: events
        })
    }
}

eventController.getEventsByCity = async (req, res) => {
    const events = await Event.find({
        city: req.params.city
    })
    if (events === undefined || events === null || !events) {
        res.json({
            staus: 'error',
            message: 'No hay eventos el día de hoy en la ciudad seleccionada'
        })
    } else {
        res.json({
            events: events
        })
    }
}

module.exports = eventController;