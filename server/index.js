const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')


// Settimgs
app.use(cors())
app.set('port', process.env.PORT || 3002);

//Middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(morgan('dev'));
app.use(express.json());

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

//TO-DO llamar al metodo de routes para eliminar todos los estados
 /*setInterval(async function clearStatus(){
        const status = await State.find();
        status.forEach(element => {
            console.log(element._id + ' jajajajjaj');
            
            //State.findByIdAndDelete(element._id)
        });
}, 1000)*/



//Starting server
app.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port'));
});