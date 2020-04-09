const express = require('express');
const morgan = require('morgan');
const State = require('./models/state');
const app = express();
const cors = require('cors')
const multer = require('multer')
const path = require('path')
const bodyParser = require('body-parser')
const cloudinary = require('cloudinary')
const stripe = require('stripe')('sk_test_9WLtiV0mcMFRIvMnNyCFo4Nf00hUUNAVV5')
cloudinary.config({
    cloud_name: 'brindis',
    api_key: '191576662983511',
    api_secret: 'Qeun7RcD5siRko0O1WObghNkmEY'
})

app.use(cors())

const {
    mongoose
} = require('./database');

// Settimgs
app.set('port', process.env.PORT || 3002);

//Middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(morgan('dev'));
app.use(express.json());
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/images'),
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, new Date().getTime() + path.extname(file.originalname))
    }
})
app.use(multer({
    storage
}).single('image'))

//Routes
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/shops', require('./routes/shop.routes'));
app.use('/api/states', require('./routes/state.routes'));
app.use('/api/events', require('./routes/event.routes'));
app.use('/api/comments', require('./routes/comment.routes'));
app.use('/api/interesteds', require('./routes/interested.routes'))
app.use('/api/attends', require('./routes/attend.routes'))
app.use('/api/favorites', require('./routes/favoriteShop.routes'))
app.use('/api/payments', require('./routes/payment.routes'))
app.use('/api/sites', require('./routes/sites.routes'))
app.use('/api/sites', require('./routes/sites.routes'))
app.use('/api/matches', require('./routes/match.routes'))
app.post('/api/payment', (req, res) => {

    stripe.paymentMethods.create({
            type: 'card',
            card: {
                number: '4242424242424242',
                exp_month: 4,
                exp_year: 2021,
                cvc: '314',
            },
        },
        function (err, paymentMethod) {
            if (err) {
                console.log(err + ' error');
                
                res.json({
                    status: 'error',
                    message: err
                })
            } else {
                console.log(paymentMethod + ' paymenene');
                
                res.json({
                    status: 'succes',
                    message: paymentMethod
                })
            }
        }
    )
})


//TO-DO llamar al metodo de routes para eliminar todos los estados
setInterval(async function clearStatus() {
    const status = await State.find();
    status.forEach(element => {
        console.log('borra ctm');
        if (new Date().getHours() > 8 && new Date().getHours() < 9) {
            State.findByIdAndDelete(element._id, (err, res) => {
                console.log('delete');
            })
        } else {}
    });
}, 86400000)



//Starting server
app.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port'));
});