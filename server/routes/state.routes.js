const express = require('express');
const router = express.Router();

const state = require('../controllers/state.controller');

router.get('/', state.getStatus) ;
router.post('/', state.createState);
router.delete('/:id', state.deleteState);

module.exports = router;