const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
require('colors');

const connectDb = require('./config/config')

//env config
dotenv.config();

// DB coonfig
connectDb();

// REST object
const app = express();

// Middlewares 
app.use(cors());
app.use(express.json());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : false}));
app.use(morgan('dev'));


// Routes
const itemRoutes = require('./routes/itemRoutes')
app.use('/api/items',itemRoutes);

const userRoutes = require('./routes/userRoutes')
app.use("/api/users",userRoutes);

const billsRoutes = require('./routes/billsRoutes')
app.use("/api/bills",billsRoutes);


// PORT
const PORT = process.env.PORT || 8080;

// Listen to PORT
app.listen(PORT ,() => {
    console.log(`Server running on : ${PORT}`.bgGreen.white);
});

