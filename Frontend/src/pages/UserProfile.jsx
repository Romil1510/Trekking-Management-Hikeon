"use client"

import { AlertTriangle, Calendar, Mail, Star, Trash, Upload, User } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const UserProfile = () => {
  const [user, setUser] = useState(null)
  const [bookings, setBookings] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [file, setFile] = useState(null)
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [bookingToDelete, setBookingToDelete] = useState(null)

  const [reviews, setReviews] = useState([])
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" })

  const [emergencyContact, setEmergencyContact] = useState({
    name: "",
    relationship: "",
    phoneNumber: "",
  })
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token")
      if (!token) {
        navigate("/login")
        return
      }

      try {
        const userResponse = await fetch("http://localhost:5000/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        if (!userResponse.ok) {
          throw new Error("Failed to fetch user data")
        }
        const userData = await userResponse.json()
        setUser(userData)
        if (userData.emergencyContact) {
          setEmergencyContact(userData.emergencyContact)
        }

        const bookingsResponse = await fetch("http://localhost:5000/api/user/bookings", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        if (!bookingsResponse.ok) {
          throw new Error("Failed to fetch bookings data")
        }
        const bookingsData = await bookingsResponse.json()
        setBookings(bookingsData)
      } catch (error) {
        console.error("Error fetching user data:", error)
        setError(error.message || "An error occurred while fetching user data")
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserData()
  }, [navigate])

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleEmergencyContactChange = (e) => {
    setEmergencyContact({
      ...emergencyContact,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem("token")
    if (!token) {
      navigate("/login")
      return
    }

    const formData = new FormData()
    if (file) {
      formData.append("identityProof", file)
    }
    formData.append("emergencyContact", JSON.stringify(emergencyContact))

    try {
      const response = await fetch("http://localhost:5000/api/user/profile", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to update profile")
      }

      const updatedUser = await response.json()
      setUser(updatedUser)
      alert("Profile updated successfully!")
    } catch (error) {
      console.error("Error updating profile:", error)
      setError(error.message || "An error occurred while updating the profile")
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  const handleReviewSubmit = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem("token")
    if (!token) {
      navigate("/login")
      return
    }

    try {
      const response = await fetch("http://localhost:5000/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newReview),
      })

      if (!response.ok) {
        throw new Error("Failed to submit review")
      }

      alert("Review submitted successfully!")
      setNewReview({ rating: 5, comment: "" })
    } catch (error) {
      console.error("Error submitting review:", error)
      setError(error.message || "An error occurred while submitting the review")
    }
  }
  const handleDeleteBooking = async (bookingId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:5000/api/user/bookings/${bookingId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to delete booking");
      }
  
      // Remove the deleted booking from the state
      setBookings(bookings.filter((booking) => booking._id !== bookingId));
      alert("Booking deleted successfully!");
    } catch (error) {
      console.error("Error deleting booking:", error);
      setError(error.message || "An error occurred while deleting the booking");
    }
  };

  const renderBookingSection = (title, bookings) => (
    <div className="mt-8 bg-white dark:bg-gray-800 shadow-lg rounded-2xl overflow-hidden transition-all hover:shadow-xl">
      <div className="px-6 py-5 bg-gradient-to-r from-indigo-600 to-purple-600">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
      <div className="border-t border-gray-200 dark:border-gray-700">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {bookings.map((booking) => (
            <li key={booking._id} className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div className="flex flex-col space-y-3 sm:flex-row sm:justify-between sm:items-center">
                <div className="flex-1">
                  <p className="text-lg font-medium text-indigo-600 dark:text-indigo-400 truncate">
                    {booking.trekId}
                  </p>
                  <div className="mt-2 flex items-center space-x-4 text-sm">
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <User className="w-5 h-5 mr-2 text-indigo-500" />
                      <span>{booking.numberOfPersons} Persons</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <Calendar className="w-5 h-5 mr-2 text-indigo-500" />
                      <span>{new Date(booking.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-4">
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium dark:bg-green-800 dark:text-green-100">
                    Booked on {new Date(booking.createdAt).toLocaleDateString()}
                  </span>
                </div>
                {title === "Upcoming Treks" && (
                  <button
                    onClick={() => {
                      setBookingToDelete(booking._id);
                      setShowDeleteConfirmation(true);
                    }}
                    className="mt-3 sm:mt-0 sm:ml-4 px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium hover:bg-red-200 dark:bg-red-800 dark:text-red-100 dark:hover:bg-red-700 transition-colors"
                  >
                    <Trash className="w-4 h-4 inline-block" /> Delete
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )

  if (isLoading) {
    return <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">Loading...</div>
  }

  if (!user) {
    return null
  }

  const currentDate = new Date()
  const upcomingBookings = bookings.filter((booking) => new Date(booking.date) > currentDate)
  const completedBookings = bookings.filter((booking) => new Date(booking.date) <= currentDate)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 space-y-12">

{showDeleteConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-md w-full">
            <div className="p-6 space-y-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <AlertTriangle className="h-16 w-16 text-red-500" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Delete Booking
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Are you sure you want to delete this booking? 100% refund when you cancel your Trek before 5 days.
                </p>
              </div>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => {
                    setShowDeleteConfirmation(false)
                    setBookingToDelete(null)
                  }}
                  className="px-6 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200 dark:text-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    handleDeleteBooking(bookingToDelete)
                    setShowDeleteConfirmation(false)
                    setBookingToDelete(null)
                  }}
                  className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
                >
                  Delete Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="max-w-4xl mx-auto bg-red-50 border-l-4 border-red-400 p-4 dark:bg-red-800 dark:border-red-600">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700 dark:text-red-200">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Profile Card */}
      <div className="max-w-4xl mx-auto mt-12 bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="relative h-32 bg-gradient-to-r from-indigo-500 to-purple-600">
          <div className="absolute -bottom-12 left-6">
            <div className="h-24 w-24 rounded-full border-4 border-white bg-gray-200 dark:border-gray-800 overflow-hidden">
              {user.identityProof ? (
                <img 
                  src={`http://localhost:5000/${user.identityProof.path}`} 
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                <User className="h-full w-full text-gray-400 p-4" />
              )}
            </div>
          </div>
        </div>

        <div className="pt-16 px-6 pb-6 space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{user.name}</h2>
            <p className="flex items-center text-gray-600 dark:text-gray-300">
              <Mail className="w-5 h-5 mr-2 text-indigo-500" />
              {user.email}
            </p>
          </div>

          {/* Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Identity Proof Card */}
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
              <div className="flex items-center mb-2">
                <Upload className="w-6 h-6 mr-2 text-indigo-500" />
                <h3 className="font-medium text-gray-900 dark:text-white">Identity Proof</h3>
              </div>
              {user.identityProof ? (
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Uploaded on {new Date(user.identityProof.uploadDate).toLocaleDateString()}
                </p>
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400">No identity proof uploaded</p>
              )}
            </div>

            {/* Emergency Contact Card */}
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
              <div className="flex items-center mb-2">
                <AlertTriangle className="w-6 h-6 mr-2 text-red-500" />
                <h3 className="font-medium text-gray-900 dark:text-white">Emergency Contact</h3>
              </div>
              {user.emergencyContact ? (
                <div className="space-y-1 text-sm">
                  <p className="text-gray-900 dark:text-white">{user.emergencyContact.name}</p>
                  <p className="text-gray-600 dark:text-gray-300">{user.emergencyContact.relationship}</p>
                  <p className="text-indigo-600 dark:text-indigo-400">{user.emergencyContact.phoneNumber}</p>
                </div>
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400">No emergency contact provided</p>
              )}
            </div>
          </div>

          {/* Update Form */}
          <div className="space-y-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Upload New Identity Proof
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-indigo-800 dark:file:text-indigo-100"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Contact Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={emergencyContact.name}
                      onChange={handleEmergencyContactChange}
                      className="w-full px-4 text-black py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Relationship
                    </label>
                    <input
                      type="text"
                      name="relationship"
                      value={emergencyContact.relationship}
                      onChange={handleEmergencyContactChange}
                      className="text-black w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={emergencyContact.phoneNumber}
                      onChange={handleEmergencyContactChange}
                      className="text-black w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Save Changes
                </button>
                <button
                  onClick={handleLogout}
                  className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Logout
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Bookings Sections */}
      {renderBookingSection("Upcoming Treks", upcomingBookings)}
      {renderBookingSection("Completed Treks", completedBookings)}

      {/* Review Section */}
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
        <div className="px-6 py-5 bg-gradient-to-r from-indigo-600 to-purple-600">
          <h3 className="text-lg font-semibold text-white">Share Your Experience</h3>
        </div>
        <form onSubmit={handleReviewSubmit} className="px-6 py-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
              Rating
            </label>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-10 w-10 cursor-pointer transition-transform duration-150 ${
                    star <= newReview.rating 
                      ? "text-yellow-400 fill-current" 
                      : "text-gray-300 dark:text-gray-600"
                  } hover:scale-125`}
                  onClick={() => setNewReview({ ...newReview, rating: star })}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Your Review
            </label>
            <textarea
              rows={4}
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white text-black"
              placeholder="Share your experience..."
            />
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  )
}

export default UserProfile