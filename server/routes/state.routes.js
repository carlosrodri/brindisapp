const express = require('express');
const router = express.Router();

const state = require('../controllers/state.controller');

router.get('/', state.getStatus) ;
router.post('/', state.createState);
router.get('/delete', state.deleteState);
router.get('/shop/:shop', state.getStatusByShop)

module.exports = router;