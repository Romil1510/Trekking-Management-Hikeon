import { Calendar, Trash2, User } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const UserProfile = () => {
  const [user, setUser] = useState(null)
  const [bookings, setBookings] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [file, setFile] = useState(null)
  const [reviews, setReviews] = useState([])
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" })
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null)

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

  const handleDeleteBooking = async (bookingId) => {
    const token = localStorage.getItem("token")
    if (!token) {
      navigate("/login")
      return
    }

    try {
      const response = await fetch(`http://localhost:5000/api/bookings/${bookingId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to delete booking")
      }

      // Remove the deleted booking from state
      setBookings(bookings.filter((booking) => booking._id !== bookingId))
      setShowDeleteConfirm(null) // Hide confirmation dialog
    } catch (error) {
      console.error("Error deleting booking:", error)
      setError(error.message || "An error occurred while deleting the booking")
    }
  }

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

  const renderBookingSection = (title, bookings) => (
    <div className="mt-8 bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">{title}</h3>
      </div>
      <div className="border-t border-gray-200 dark:border-gray-700">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {bookings.map((booking) => (
            <li key={booking._id} className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400 truncate">
                  Trek: {booking.trekId}
                </p>
                <div className="ml-2 flex-shrink-0 flex items-center space-x-4">
                  <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                    Date: {new Date(booking.date).toLocaleDateString()}
                  </p>
                  {title === "Upcoming Treks" && (
                    <button
                      onClick={() => setShowDeleteConfirm(booking._id)}
                      className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  )}
                </div>
              </div>
              <div className="mt-2 sm:flex sm:justify-between">
                <div className="sm:flex">
                  <p className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <User className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
                    Persons: {booking.numberOfPersons}
                  </p>
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
                  <Calendar className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
                  <p>Booked on: {new Date(booking.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              {showDeleteConfirm === booking._id && (
                <div className="mt-4 bg-red-50 dark:bg-red-900 p-4 rounded-md">
                  <p className="text-sm text-red-800 dark:text-red-200">
                    Are you sure you want to delete this booking?
                  </p>
                  <div className="mt-2 flex space-x-4">
                    <button
                      onClick={() => handleDeleteBooking(booking._id)}
                      className="text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-800"
                    >
                      Yes, delete
                    </button>
                    <button
                      onClick={() => setShowDeleteConfirm(null)}
                      className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-800"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      {error && (
        <div
          className="max-w-4xl mx-auto mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}
      {/* Rest of the component remains the same */}
      {/* ... */}
    </div>
  )
}

export default UserProfile