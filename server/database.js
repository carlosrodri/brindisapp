const mongoose = require('mongoose');


/*'mongodb://localhost/bar'*/ 
const URI = 'mongodb+srv://admin:abc.52106@cluster0-5cmep.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(URI)
.then((db) => {
    console.log('DB is connected');
}).catch((err) => {
    console.error(err);
});

module.exports = mongoose;