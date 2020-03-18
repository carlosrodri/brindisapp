const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors')
const multer = require('multer')
const bodyParser = require('body-parser')

let UPLOAD_PATH = 'public/images/'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, UPLOAD_PATH)
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

let upload = multer({
    storage: storage
})

app.use(cors())

const {
    mongoose
} = require('./database');

// Settimgs
app.set('port', process.env.PORT || 3000);

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
app.use('/api/sites', require('./routes/sites.routes'))
app.post('/api/picture', upload.single('image'), (req, res, next) => {
    res.json({
        message: req.file.filename
    })
})

//Starting server
app.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port'));
});