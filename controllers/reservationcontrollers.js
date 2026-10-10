const Reservation = require("../models/reservation");

const createReservation = async (req,res) => {
  try {
    const { table, date, time, guests } = req.body;
    const existing = await Reservation.findOne({ table, date, time, status: { $ne: "Declined" } });
    if(existing) return res.status(409).json({message:"Table already booked at this time"});
    const reservation = await Reservation.create({ user: req.user._id, table, date, time, guests });
    res.status(201).json(reservation);
  } catch(e){ res.status(500).json({message:e.message}) }
};

const myReservations = async (req,res) => {
  const data = await Reservation.find({ user: req.user._id }).populate("table");
  res.json(data);
};

const allReservations = async (req,res) => {
  const data = await Reservation.find().populate("user","name").populate("table");
  res.json(data);
};

const updateReservation = async (req,res) => {
  const { status } = req.body;
  const r = await Reservation.findByIdAndUpdate(req.params.id, { status }, { new:true });
  if(!r) return res.status(404).json({message:"Not found"});
  res.json(r);
};

module.exports = { createReservation, myReservations, allReservations, updateReservation };