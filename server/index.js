const express = require('express');
const morgan = require('morgan');
const app = express();
const state = require('./models/state')
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
app.set('etag', false)
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
app.use('/api/codes', require('./routes/codes.routes'))
app.post('/api/payment', (req, res) => {
  stripe.charges.create({
      amount: 25000 * 100,
      currency: 'cop',
      source: req.body.token,
      description: 'My First Test Charge (created for API docs)',
    },
    function (err, charge) {
      if (err) {
        switch (err.type) {
          case 'StripeCardError':
            // => e.g. "Your card's expiration year is invalid."
            res.json({
              status: 'error',
              message: 'Tarjeta sin fondos suficientes o año de expiración no váilido'
            })
            break;
          case 'StripeRateLimitError':
            // Too many requests made to the API too quickly
            res.json({
              status: 'error',
              message: 'Ha ocurrido un error, intenta más tarde'
            })
            break;
          case 'StripeInvalidRequestError':
            // Invalid parameters were supplied to Stripe's API
            res.json({
              status: 'error',
              message: 'Ha ocurrido un error en el servidor, vuelve a intentarlo'
            })
            break;
          case 'StripeAPIError':
            // An error occurred internally with Stripe's API
            res.json({
              status: 'error',
              message: 'Ha ocurrido un error en el servidor, vuelve a intentarlo'
            })
            break;
          case 'StripeConnectionError':
            // Some kind of error occurred during the HTTPS communication
            res.json({
              status: 'error',
              message: 'Ha ocurrido un error en el servidor, vuelve a intentarlo'
            })
            break;
          case 'StripeAuthenticationError':
            // You probably used an incorrect API key
            res.json({
              status: 'error',
              message: 'Ha ocurrido un error en el servidor, vuelve a intentarlo'
            })
            break;
          default:
            res.json({
              status: 'error',
              message: 'Ha ocurrido un error en el servidor, vuelve a intentarlo'
            })
            break;
        }
      } else {
        res.json({
          status: 'succes',
          message: 'Pago registrado con éxito'
        })

        console.log(charge + '  charge');
      }
    }
  )
})

setTimeout(async()=>{
  if (new Date().getHours()-5 === 8) {
    console.log('entra ' + new Date().getHours()-5);
    
    const status = await state.find();
    status.forEach(element => {
      console.log('borra ctm');
      if (new Date().getHours()-5 === 8) {
        State.findByIdAndDelete(element._id, (err, res) => {
          console.log('delete');
        })
      } else {}
    });
  }
},1000)
//TO-DO llamar al metodo de routes para eliminar todos los estados
setInterval(async function clearStatus() {
  const status = await state.find();
  status.forEach(element => {
    console.log('borra ctm');
    if (new Date().getHours()-5 === 8) {
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