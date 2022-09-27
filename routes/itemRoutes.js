const express = require('express');
const { getItemController, addItemController, editItemController, deleteItemController } = require('../controllers/itemController');

const router = express.Router();


// Routes

// Method - GET /getItem
router.get('/getItem',getItemController)

// Methos - POST /addItem
router.post('/addItem',addItemController)


// Method - PUT /editItem
router.put('/editItem',editItemController);

// Method - DELETE /deleteItem
router.post('/deleteItem',deleteItemController);

module.exports = router