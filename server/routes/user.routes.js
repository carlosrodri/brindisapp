const express = require('express');
const router = express.Router();

const user = require('../controllers/user.controller');

router.get('/', user.getUsers) ;
router.post('/', user.createUser);
router.get('/mail/:mail', user.getUserbyMail);
router.put('/:id', user.editUser);
router.delete('/:id', user.deleteUser);
router.post('/singin', user.signIn)

module.exports = router;