const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors')
const multer = require('multer')
const path = require('path')
const bodyParser = require('body-parser')
const cloudinary = require('cloudinary')
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
app.use('/api/codes', require('./routes/codes.routes'))
app.post('/api/picture', async (req, res) => {
    console.log(req.file.path + ' archivooooo');
    console.log(req.file + '  boody');
    console.log(cloudinary.v2.uploader.upload(req.file.path).url + '        url');
    
    const result = await cloudinary.v2.uploader.upload(req.file.path).url
    console.log(result.url + ' url jajajajjaa');

    
    res.json({
        message: result.url
    })
})                                         

//Starting server
app.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port'));
});