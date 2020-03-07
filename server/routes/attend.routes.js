const express = require('express');
const router = express.Router();

const attend = require('../controllers/attend.controller');

router.get('/events', attend.getAttendByEvent) ;
router.get('/users', attend.getAttendByUser) ;
router.post('/', attend.addAttend);

module.exports = router;