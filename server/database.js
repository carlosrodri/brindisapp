const mongoose = require('mongoose');


/*'mongodb://localhost/bar'*/ 
const URI = 'mongodb+srv://admin:abc.52106@cluster0-ekfve.mongodb.net/test?retryWrites=true&w=majority';



/*const MongoClient = require('mongod').MongoClient();
const uri = "mongodb+srv://admin:abc.52106@cluster0-5cmep.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true }, { useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});*/

const connectDB = async () => {
  try {
  const connection = await mongoose.connect(
  URI,
  {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
  }
  )
  console.log('MongoDB connected: ${connection.connection.host}');
  } catch (error) {
  console.log('MongoDB error when connecting: ${error}');
  }
  }
  connectDB()


/*mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then((db) => {
    console.log('DB is connected');
}).catch((err) => {
    console.error(err);
});*/

module.exports = mongoose;