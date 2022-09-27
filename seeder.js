const mongoose = require('mongoose');
const dotenv = require('dotenv');

const connectDb = require('./config/config');
const itemModel = require('./models/itemModel');
const items = require('./utils/data');

require('colors');


// Configuration
dotenv.config();

// Connect to DB // from config/config.js
connectDb();

// Seeding Function
const importData = async() => {
    try {
        // First delete all the existing data
        await itemModel.deleteMany();

        // Again add the items from data.js in our Db
        const itemsdata = await itemModel.insertMany(items);
        console.log("All Items Added".bgMagenta);
        process.exit();

    }catch(error){
        console.log(`{error}`.bgRed.inverse);
        process.exit(1);
    }
};

importData();


