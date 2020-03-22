const Payment = require('../models/payment')
const paymentController = {}

paymentController.getPaymentByMail = async (req, res) => {
    const payment = await Payment.findOne({
        'userMail': req.params.mail
    })
    console.log(payment);
    
    if (payment === null) {
        res.json({
            status: 'error',
            message: 'No hay pago'
        })
    } else {
        res.json({
            payment: payment
        })
    }
}

paymentController.addPayment = async (req, res) => {
    const payment = new Payment(req.body)
    await payment.save()
    res.json({
        stsus: 'succes',
        message: 'Pago registrado con éxito'
    })
}

paymentController.updatePayment = async (req, res) => {
    const paymentUpdated = {
        payDate: req.body.payDate,
        userMail: req.body.userMail,
        defeat: req.body.defeat
    }
    await Payment.findByIdAndUpdate(req.params.id, {
        $set: paymentUpdated
    }, {
        new: true
    });
    res.json({
        status: 'succes',
        message: 'Pago Registrado'
    })
}

module.exports = paymentController