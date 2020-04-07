const express = require('express');
const router = express.Router();

const match = require('../controllers/match.controller')

router.get('/shop/:shopId', match.getMatchByShop)
router.get('/', match.getMatches)
router.post('/', match.getMatchByShop)

module.exports = router