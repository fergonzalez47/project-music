const moongose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();


const URL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@music-cluster.iduyimf.mongodb.net/?retryWrites=true&w=majority`;

const connectDB = async () => {
    try {
        await moongose.connect(URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log("***..Mongo DB connected successfully.. ****");
    } catch (error) {
        console.error("Error connecting to MongoDB", error);
    }
};


module.exports = connectDB;