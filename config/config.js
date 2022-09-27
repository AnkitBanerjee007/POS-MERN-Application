const mongoose = require('mongoose');
require('colors');

// Configuring our MongoDB Database
// MongoDb connection
const connectDb = async() => {
    try{

        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Database Connected ${conn.connection.host}`.bgYellow.white);

    }catch(error){
        console.log(`Error : ${error.message}`.bgRed.white);
        process.exit(1);
    }
}

module.exports = connectDb;