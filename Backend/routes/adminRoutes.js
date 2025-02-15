const express = require("express")
const router = express.Router()
const User = require("../models/User")
const Trek = require("../models/Trek")
const Booking = require("../models/Booking")
const Review = require("../models/Review")

// Get all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find().select("-password")
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error: error.message })
  }
})

// Delete a user
router.delete("/users/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id)
    res.json({ message: "User deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error: error.message })
  }
})

// Get all bookings
router.get("/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find().populate("user", "name email").populate("trek", "name")
    res.json(bookings)
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings", error: error.message })
  }
})

// Delete a booking
router.delete("/bookings/:id", async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id)
    res.json({ message: "Booking deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: "Error deleting booking", error: error.message })
  }
})

// Get all reviews
router.get("/reviews", async (req, res) => {
  try {
    const reviews = await Review.find().populate("user", "name").populate("trek", "name")
    res.json(reviews)
  } catch (error) {
    res.status(500).json({ message: "Error fetching reviews", error: error.message })
  }
})

// Delete a review
router.delete("/reviews/:id", async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id)
    res.json({ message: "Review deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: "Error deleting review", error: error.message })
  }
})

// Create a new trek
router.post("/treks", async (req, res) => {
  try {
    const newTrek = new Trek(req.body)
    await newTrek.save()
    res.status(201).json(newTrek)
  } catch (error) {
    res.status(500).json({ message: "Error creating trek", error: error.message })
  }
})

// Get all treks
router.get("/treks", async (req, res) => {
  try {
    const treks = await Trek.find()
    res.json(treks)
  } catch (error) {
    res.status(500).json({ message: "Error fetching treks", error: error.message })
  }
})

// Delete a trek
router.delete("/treks/:id", async (req, res) => {
  try {
    await Trek.findByIdAndDelete(req.params.id)
    res.json({ message: "Trek deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: "Error deleting trek", error: error.message })
  }
})

// Get dashboard statistics
router.get("/statistics", async (req, res) => {
  try {
    const userCount = await User.countDocuments()
    const trekCount = await Trek.countDocuments()
    const bookingCount = await Booking.countDocuments()
    const reviewCount = await Review.countDocuments()

    const recentBookings = await Booking.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("user", "name")
      .populate("trek", "name")

    res.json({
      userCount,
      trekCount,
      bookingCount,
      reviewCount,
      recentBookings,
    })
  } catch (error) {
    res.status(500).json({ message: "Error fetching statistics", error: error.message })
  }
})

module.exports = router

