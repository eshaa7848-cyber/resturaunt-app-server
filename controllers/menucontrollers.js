const MenuItem = require("../models/menuitem");

const getMenu = async (req,res) => {
  try {
    const { category, search } = req.query;
    let filter = {};
    if(category) filter.category = category;
    if(search) filter.name = { $regex: search, $options: "i" };
    const items = await MenuItem.find(filter);
    res.json(items);
  } catch(e){ res.status(500).json({message:e.message}) }
};

const getOne = async (req,res) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if(!item) return res.status(404).json({message:"Item not found"});
    res.json(item);
  } catch(e){
    if(e.name === 'CastError') return res.status(400).json({message:"Invalid ID"});
    res.status(500).json({message:e.message})
  }
};

const createItem = async (req,res) => {
  try {
    const item = await MenuItem.create(req.body);
    res.status(201).json(item);
  } catch(e){ res.status(400).json({message:e.message}) }
};

const updateItem = async (req,res) => {
  try {
    const item = await menuitem.findByIdAndUpdate(req.params.id, req.body, { new:true, runValidators:true });
    if(!item) return res.status(404).json({message:"Item not found"});
    res.json(item);
  } catch(e){
    if(e.name === 'CastError') return res.status(400).json({message:"Invalid ID"});
    res.status(400).json({message:e.message})
  }
};

const deleteItem = async (req,res) => {
  try {
    const item = await menuitem.findByIdAndDelete(req.params.id);
    if(!item) return res.status(404).json({message:"Item not found"});
    res.json({message:"Item deleted"});
  } catch(e){
    if(e.name === 'CastError') return res.status(400).json({message:"Invalid ID"});
    res.status(500).json({message:e.message})
  }
};

module.exports = { getMenu, getOne, createItem, updateItem, deleteItem };