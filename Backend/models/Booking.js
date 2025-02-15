const mongoose = require("mongoose")

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  trekId: { type: String, required: true },
  date: { type: Date, required: true },
  numberOfPersons: { type: Number, required: true },
  persons: [{ type: String }],
  paymentId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model("Booking", bookingSchema)

