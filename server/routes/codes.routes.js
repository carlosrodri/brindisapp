const express = require('express');
const router = express.Router();
const code = require('../controllers/code.controller')

router.get('/:code', code.getCode)
router.get('/', code.getCodes)
router.delete('/:id', code.deleteCode)
router.post('/', code.createCode)

module.exports = router