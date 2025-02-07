// database is connected to this File(db.js)

const { default: mongoose } = require('mongoose');
const MongoURI = "mongodb://localhost:27017/inotebook"

const connectToMongo = async()=>{
    await mongoose.connect(MongoURI);
    console.log("Connected successfully");
}

module.exports = connectToMongo;