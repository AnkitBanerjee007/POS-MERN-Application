const express = require('express');
const { addBillsController, getBillsController } = require('../controllers/billsController');

const router = express.Router();


// Routes


// Methos - POST /addBills
router.post('/addBills',addBillsController);

// Method - GET /getBills
router.get('/getBills', getBillsController);



module.exports = router