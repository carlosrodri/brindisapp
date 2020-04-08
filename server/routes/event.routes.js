const express = require('express');
const router = express.Router();

const event = require('../controllers/event.controller');

router.get('/', event.getEvents) ;
router.post('/', event.createEvent);
router.get('/shop/:shop', event.getEventsByShop);
router.get('/suggestions/:city', event.getSuggestedByCity);
router.delete('/:id', event.deleteEvent);
router.get('/id/:id', event.getEventById);
router.get('/city/:city', event.getEventsByCity)
router.put('/:id', event.updateEvent);

module.exports = router;