require('colors');

const itemModel = require('../models/itemModel');

// /getItem
const getItemController = async (req,res) => {
    try {
        // Getting all the items from the DB
        const items = await itemModel.find();
        res.status(200).send(items);
    } catch (error) {
        console.log(`Error from itemController : ${error}`.bgRed.inverse);
    }
}

// /addItem
const addItemController = async (req,res) => {
    try {
        const newItem = new itemModel(req.body);
        await newItem.save();
        res.status(201).send("Item Created Successfully");
    } catch (error) {
        res.status(400).send("Error in addItemController",error);
        console.log(error);
    }
}

// /editItem
const editItemController = async (req, res) => {
    try {
      const { itemId } = req.body;
      console.log(itemId);
      await itemModel.findOneAndUpdate({ _id: itemId }, req.body, {
        new: true,
      });
  
      res.status(201).json("item Updated");
    } catch (error) {
      res.status(400).send(error);
      console.log(error);
    }
  };


// /deleteItem
const deleteItemController = async (req, res) => {
    try {
      const { itemId } = req.body;
      console.log(itemId);
      await itemModel.findOneAndDelete({ _id: itemId });
      res.status(200).json("item Deleted");
    } catch (error) {
      res.status(400).send(error);
      console.log(error);
    }
  };

module.exports = {getItemController , addItemController , editItemController , deleteItemController};