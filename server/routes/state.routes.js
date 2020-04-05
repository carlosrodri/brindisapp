const express = require('express');
const router = express.Router();

const state = require('../controllers/state.controller');

router.get('/', state.getStatus) ;
router.post('/', state.createState);
router.delete('/:id', state.deleteState);
router.get('/shop/:shop', state.getStatusByShop)
router.get('/:id', state.getStatusById)
router.post('/like', state.addLike);
router.post('/dontLike', state.addDontLike);

module.exports = router;