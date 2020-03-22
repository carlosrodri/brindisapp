const express = require('express');
const router = express.Router();

const payment = require('../controllers/payment.controller');

router.get('/mail/:mail', payment.getPaymentByMail) ;
router.post('/', payment.addPayment);
router.get('/:id', payment.updatePayment);

module.exports = router;