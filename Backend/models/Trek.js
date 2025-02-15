const mongoose = require("mongoose")

const trekSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: String, required: true },
  difficulty: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  maxGroupSize: { type: Number, required: true },
  startDates: [{ type: Date }],
  createdAt: { type: Date, default: Date.now },
  rating: { type: Number, default: 4.8 },
  features: [String],
})

module.exports = mongoose.model("Trek", trekSchema)

