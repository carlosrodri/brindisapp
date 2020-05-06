const express = require('express');
const router = express.Router();

const report = require('../controllers/report.controller');

router.get('/', report.getReports) ;
router.post('/', report.addReport);

module.exports = router;