const express = require('express');
const router = express.Router();

const interested = require('../controllers/interested.controller');

router.get('/event/:event', interested.getInterestedByEvent) ;
router.get('/users/:mail', interested.getInterestedByUser) ;
router.get('/', interested.getInteresteds)
router.post('/', interested.addInterested);

module.exports = router;