const mongoose = require("mongoose");
const menuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  category: { type: String, required: true, enum: ["Starters","Mains","Desserts","Drinks"] },
  image: { type: String },
  isAvailable: { type: Boolean, default: true }
},{ timestamps: true });
module.exports = mongoose.model("MenuItem", menuSchema);