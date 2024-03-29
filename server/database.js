const mongoose = require('mongoose');
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
} else {
  
}


const UR = 'mongodb://localhost/bar'
const URIM = ''
const MONGO_DB_URI = ''

/*const MongoClient = require('mongod').MongoClient();
const uri = "mongodb+srv://admin:abc.52106@cluster0-5cmep.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true }, { useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});*/



mongoose.connect(MONGO_DB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then((db) => {
    console.log('DB is connected');
}).catch((err) => {
    console.error(err);
});

module.exports = mongoose;
