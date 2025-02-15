const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: [true, "Password is required"]
  },
  identityProof: {
    filename: String,
    path: String,
    uploadDate: Date
  },
  emergencyContact: {
    name: String,
    relationship: String,
    phoneNumber: String
  },
  resetToken: String,
  resetTokenExpiration: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Add indexes
userSchema.index({ email: 1 }, { unique: true });

const User = mongoose.model("User", userSchema);

module.exports = User;