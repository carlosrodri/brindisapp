const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors')
const multer = require('multer')
const path = require('path')
const bodyParser = require('body-parser')

const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/images'),
    filename: (req, file, cb) =>{
        cb(null, file.originalname)
    }
})

const uploader = multer({storage})

app.use(cors())

const {
    mongoose
} = require('./database');

// Settimgs
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(morgan('dev'));
app.use(express.json());
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,OPTIONS,DELETE,PATCH');
    res.setHeader('Access-Control-Allow-Headers','Content-Type, Accept');
    next();
});
app.use(express.static(path.join(__dirname,'/public')));//Directorio para archivos staticos
app.use('/uploads',express.static(path.join(__dirname,'/uploads')));//Directorio de imagenes

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
app.post('/api/picture',uploader.single('file'),(req,res)=>{
    const {file,body}=req;//req.file existe gracias al middleware de multer
    res.status(200).json({
        body:body,
        file:file
    })
})


//Starting server
app.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port'));
});