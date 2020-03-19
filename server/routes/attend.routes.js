const express = require('express');
const router = express.Router();

const attend = require('../controllers/attend.controller');

router.get('/event/:event', attend.getAttendByEvent) ;
router.get('/users/:mail', attend.getAttendByUser) ;
router.post('/', attend.addAttend);

module.exports = router;