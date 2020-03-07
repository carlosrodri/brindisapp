const Event = require('../models/event');
const eventController = {};
const User = require('../models/user')


eventController.getEvents = async (req, res) => {
    const events = await Event.find();
    res.json(events);
}

eventController.getEventById = async (req, res) =>{
    const event = await Event.find({
        '_id': req.parms.idEvent
    });
    res.json({event: event});
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

module.exports = eventController;