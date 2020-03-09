const express = require('express');
const router = express.Router();
const site = require('../controllers/sites.controller')

router.get('/', site.getCities)

module.exports = router