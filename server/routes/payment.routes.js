const express = require('express');
const router = express.Router();

const payment = require('../controllers/payment.controller');

router.get('/mail/:mail', payment.getPaymentByMail) ;
router.get('/', payment.getPyaments)
router.post('/', payment.addPayment);

module.exports = router;