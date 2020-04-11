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

paymentController.deletePayment = async (req, res) => {
    console.log(req.params.id);
    
    await Payment.findByIdAndDelete(req.params.id)
    res.json({
        statys: 'delete'
    })
}

paymentController.getPyaments = async (req, res) => {
    const payments = await Payment.find()
    res.json({
        payments: payments
    })
}
module.exports = paymentController