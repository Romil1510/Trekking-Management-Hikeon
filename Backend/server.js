const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const multer = require("multer");
const twilio = require("twilio");
const User = require("./models/User");
const Booking = require("./models/Booking");
const Review = require("./models/Review");
const adminRoutes = require("./routes/adminRoutes");
require("dotenv").config();

const app = express();

// Twilio configuration
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Middleware
app.use(cors());
app.use(express.json());

// Store verification codes temporarily (in production, use Redis or similar)
const verificationCodes = new Map();

// Generate random 6-digit code
const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send verification code endpoint
app.post("/api/verify/send", async (req, res) => {
  try {
    const { mobileNumber } = req.body;

    if (!mobileNumber) {
      return res.status(400).json({ message: "Mobile number is required" });
    }

    const code = generateVerificationCode();

    // Store the code (with 5-minute expiration)
    verificationCodes.set(mobileNumber, {
      code,
      expires: Date.now() + 5 * 60 * 1000,
    });

    // Send SMS using Twilio
    await twilioClient.messages.create({
      body: `Your verification code for HikeOn booking is: ${code}`,
      to: mobileNumber,
      from: process.env.TWILIO_PHONE_NUMBER,
    });

    res.json({ message: "Verification code sent successfully" });
  } catch (error) {
    console.error("Error sending verification code:", error);
    res.status(500).json({
      message: "Failed to send verification code",
      error: error.message,
    });
  }
});

// Verify code endpoint
app.post("/api/verify/check", (req, res) => {
  try {
    const { mobileNumber, code } = req.body;

    if (!mobileNumber || !code) {
      return res.status(400).json({ message: "Mobile number and code are required" });
    }

    const storedData = verificationCodes.get(mobileNumber);

    if (!storedData) {
      return res.status(400).json({ message: "No verification code found" });
    }

    if (Date.now() > storedData.expires) {
      verificationCodes.delete(mobileNumber);
      return res.status(400).json({ message: "Verification code expired" });
    }

    if (storedData.code !== code) {
      return res.status(400).json({ message: "Invalid verification code" });
    }

    // Clean up the used code
    verificationCodes.delete(mobileNumber);

    res.json({ message: "Verification successful" });
  } catch (error) {
    console.error("Error verifying code:", error);
    res.status(500).json({
      message: "Failed to verify code",
      error: error.message,
    });
  }
});

// Connect to MongoDB Atlas
mongoose
  .connect(
    "mongodb+srv://champ040cp:3cZJAMK4gadMsRoE@hikeon.vbxq7.mongodb.net/?retryWrites=true&w=majority&appName=HikeOn",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("Could not connect to MongoDB Atlas", err));

// JWT Secret
const JWT_SECRET = "your_jwt_secret"; // In production, use an environment variable

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access denied" });

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};

// Routes
app.use("/api/admin", adminRoutes);

app.post("/api/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating user" });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ token, userId: user._id, name: user.name });
  } catch (error) {
    res.status(500).json({ message: "Error logging in" });
  }
});

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Update user profile route
app.put("/api/user/profile", verifyToken, upload.single("identityProof"), async (req, res) => {
  try {
    const { emergencyContact } = req.body;
    const userId = req.user.userId;

    const updateData = {
      emergencyContact: JSON.parse(emergencyContact),
    };

    if (req.file) {
      updateData.identityProof = {
        filename: req.file.originalname,
        path: req.file.path,
        uploadDate: new Date(),
      };
    }

    const user = await User.findByIdAndUpdate(userId, updateData, { new: true }).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ message: "Error updating user profile" });
  }
});

app.get("/api/user", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Error fetching user profile" });
  }
});


// Add to server.js
app.get("/api/recommendations", verifyToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    
    // Get user's booked treks
    const bookings = await Booking.find({ userId }).populate("trekId");
    const bookedTreks = bookings.map(b => b.trekId);

    if (bookedTreks.length === 0) {
      const general = await Trek.find().sort({ rating: -1 }).limit(6);
      return res.json(general);
    }

    // Get all treks excluding booked ones
    const allTreks = await Trek.find({ _id: { $nin: bookedTreks.map(t => t._id) } });

    // Calculate similarity scores
    const recommendations = allTreks.map(trek => {
      const score = calculateSimilarity(bookedTreks, trek);
      return { ...trek._doc, score };
    })
    .sort((a, b) => b.score - a.scores)
    .slice(0, 6);

    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ message: "Recommendation error" });
  }
});

function calculateSimilarity(bookedTreks, targetTrek) {
  // Simple weighted similarity calculation
  const weights = { difficulty: 0.4, duration: 0.3, price: 0.3 };
  
  const diffs = bookedTreks.map(bt => {
    const diffScore = bt.difficulty === targetTrek.difficulty ? 1 : 0;
    const durScore = 1 - Math.abs(bt.duration - targetTrek.duration) / 24;
    const priceScore = 1 - Math.abs(bt.price - targetTrek.price) / 1000;
    
    return (weights.difficulty * diffScore) + 
           (weights.duration * durScore) + 
           (weights.price * priceScore);
  });

  return diffs.reduce((a, b) => a + b, 0) / diffs.length;
}




// Modified booking route to send confirmation SMS
app.post("/api/book", verifyToken, async (req, res) => {
  try {
    const { trekId, date, numberOfPersons, persons, paymentId, mobileNumber } = req.body;
    const userId = req.user.userId;

    const booking = new Booking({
      userId,
      trekId,
      date,
      numberOfPersons,
      persons,
      paymentId,
      mobileNumber,
      paymentMethod: "Mock Card Payment", // Add payment method type
      paymentStatus: "completed",
    });

    await booking.save();

    // Send confirmation SMS
    await twilioClient.messages.create({
      body: `Your booking for trek on ${new Date(date).toLocaleDateString()} has been confirmed! Booking ID: ${booking._id}`,
      to: mobileNumber,
      from: process.env.TWILIO_PHONE_NUMBER,
    });

    res.status(201).json({
      message: "Booking successful",
      bookingId: booking._id,
    });
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ message: "Error creating booking" });
  }
});

// Get user bookings route
app.get("/api/user/bookings", verifyToken, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.userId }).sort({ date: -1 });
    res.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Error fetching bookings" });
  }
});




app.post("/api/reviews", verifyToken, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const userId = req.user.userId;

    const review = new Review({
      userId,
      rating,
      comment,
    });

    await review.save();

    res.status(201).json({
      message: "Review submitted successfully",
      reviewId: review._id,
    });
  } catch (error) {
    console.error("Review submission error:", error);
    res.status(500).json({ message: "Error submitting review" });
  }
});

app.get("/api/reviews", async (req, res) => {
  try {
    const reviews = await Review.find().populate("userId", "name").sort({ createdAt: -1 }).limit(10);
    res.json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: "Error fetching reviews" });
  }
});


// Add this to server.js
app.delete("/api/user/bookings/:id", verifyToken, async (req, res) => {
  try {
    const bookingId = req.params.id;
    const userId = req.user.userId;

    // Verify that the booking belongs to the user
    const booking = await Booking.findOne({ _id: bookingId, userId });
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Check if the booking is in the past
    if (new Date(booking.date) < new Date()) {
      return res.status(400).json({ message: "Cannot delete past bookings" });
    }

    await Booking.deleteOne({ _id: bookingId });
    res.json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ message: "Error deleting booking" });
  }
});

app.post("/api/logout", verifyToken, (req, res) => {
  res.json({ message: "Logged out successfully" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, ('0.0.0.0'),() => console.log(`Server running on port ${PORT}`));
