const jwt = require("jsonwebtoken")
const User = require("../models/User")

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]

  if (!token) return res.status(401).json({ message: "Authentication required" })

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid or expired token" })
    req.user = user
    next()
  })
}

exports.isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)
    if (!user || !user.isAdmin) {
      return res.status(403).json({ message: "Admin access required" })
    }
    next()
  } catch (error) {
    res.status(500).json({ message: "Error checking admin status", error: error.message })
  }
}

