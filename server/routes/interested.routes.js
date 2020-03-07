const express = require('express');
const router = express.Router();

const interested = require('../controllers/interested.controller');

router.get('/events', interested.getInterestedByEvent) ;
router.get('/users', interested.getInterestedByUser) ;
router.post('/', interested.addInterested);

module.exports = router;