const Order = require("../models/order");
const MenuItem = require("../models/menuitem");

const placeOrder = async (req,res) => {
  try {
    const { items } = req.body; // [{menuItem, quantity}]
    if(!items || items.length === 0) return res.status(400).json({message:"No items"});

    let totalPrice = 0;
    for(let i of items){
      const dish = await menuitem.findById(i.menuitem);
      if(!dish) return res.status(404).json({message:`Dish not found ${i.menuitem}`});
      if(!dish.isAvailable) return res.status(400).json({message:`${dish.name} is unavailable`});
      totalPrice += dish.price * i.quantity; // Server calculates total, not app - to prevent cheating
    }
    const order = await Order.create({ user: req.user._id, items, totalPrice });
    res.status(201).json(order);
  } catch(e){ res.status(500).json({message:e.message}) }
};

const myOrders = async (req,res) => {
  const orders = await Order.find({ user: req.user._id }).populate("items.menuitem").sort({createdAt:-1});
  res.json(orders);
};

const allOrders = async (req,res) => {
  const orders = await Order.find().populate("user","name email").populate("items.menuitem").sort({createdAt:-1});
  res.json(orders);
};

const updateStatus = async (req,res) => {
  const { status } = req.body;
  const order = await Order.findById(req.params.id);
  if(!order) return res.status(404).json({message:"Order not found"});

  const validFlow = ["Pending","Preparing","Ready","Served"];
  const currentIndex = validFlow.indexOf(order.status);
  const newIndex = validFlow.indexOf(status);

  if(status === "Cancelled"){
    if(order.status!== "Pending") return res.status(400).json({message:"Can only cancel Pending orders"});
  } else {
    if(newIndex <= currentIndex) return res.status(400).json({message:`Invalid status transition from ${order.status} to ${status}`});
  }

  order.status = status;
  await order.save();
  res.json(order);
};

module.exports = { placeOrder, myOrders, allOrders, updateStatus };