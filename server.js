require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;
connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req,res)=> res.json({message:"Restaurant API running"}));
app.get("/api/health", (req,res)=> res.json({ status:"ok", time:new Date().toISOString() }));

app.use("/api/menu", require("./routes/menuroutes"));
app.use("/api/auth", require("./routes/authroutes"));
app.use("/api/orders", require("./routes/orderroutes"));
app.use("/api/reservations", require("./routes/reservationroutes"));

app.use((req,res)=> res.status(404).json({message:"Route not found"}));
app.use((err,req,res,next)=> res.status(500).json({message:"Server Error"}));

app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));

