require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const connectDB = require("./config/db");
const User = require("./models/user");
const MenuItem = require("./models/menuitem");
const Table = require("./models/table");

const menuItems = [
  { name: "Chicken Biryani", description: "Spicy chicken biryani", price: 450, category: "Mains", isAvailable: true },
  { name: "Beef Burger", description: "Juicy beef burger", price: 550, category: "Mains", isAvailable: true },
  { name: "Chicken Karahi", description: "Traditional karahi", price: 1200, category: "Mains", isAvailable: true },
  { name: "Fries", description: "Crispy fries", price: 200, category: "Starters", isAvailable: true },
  { name: "Chicken Soup", description: "Hot soup", price: 300, category: "Starters", isAvailable: true },
  { name: "Samosa", description: "2 pcs", price: 100, category: "Starters", isAvailable: true },
  { name: "Spring Roll", description: "Veg rolls", price: 250, category: "Starters", isAvailable: true },
  { name: "Pizza", description: "Cheese pizza", price: 900, category: "Mains", isAvailable: true },
  { name: "Pasta", description: "Alfredo pasta", price: 650, category: "Mains", isAvailable: true },
  { name: "Naan", description: "Rogni naan", price: 50, category: "Mains", isAvailable: true },
  { name: "Gulab Jamun", description: "Sweet dish", price: 150, category: "Desserts", isAvailable: true },
  { name: "Ice Cream", description: "Vanilla scoop", price: 200, category: "Desserts", isAvailable: true },
  { name: "Kheer", description: "Rice pudding", price: 180, category: "Desserts", isAvailable: true },
  { name: "Pepsi", description: "Cold drink", price: 100, category: "Drinks", isAvailable: true },
  { name: "Lassi", description: "Sweet lassi", price: 120, category: "Drinks", isAvailable: true },
];

const seed = async () => {
  await connectDB();
  await User.deleteMany(); await MenuItem.deleteMany(); await Table.deleteMany();
  const hashedPass = await bcrypt.hash("123456", 10);
  await User.create([
    { name: "Customer", email: "customer@test.com", password: hashedPass, role: "customer" },
    { name: "Manager", email: "manager@test.com", password: hashedPass, role: "manager" }
  ]);
  await MenuItem.insertMany(menuItems);
  await Table.insertMany([
    { tableNumber: 1, capacity: 2 }, { tableNumber: 2, capacity: 4 },
    { tableNumber: 3, capacity: 4 }, { tableNumber: 4, capacity: 6 },
    { tableNumber: 5, capacity: 2 }, { tableNumber: 6, capacity: 8 }
  ]);
  console.log("Data Seeded: customer@test.com / manager@test.com pass: 123456");
  process.exit();
};
seed();