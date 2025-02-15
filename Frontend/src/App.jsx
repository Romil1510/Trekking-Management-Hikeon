import { React, useCallback, useEffect, useMemo, useState } from "react"
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Contactmiddle from "./component/Contactmiddle"
import Footer from "./component/Footer"
import Loading from "./component/Loading"
import Navbar from "./component/Navbar"
import About from "./pages/About"
import AdminDashboard from "./pages/AdminDashboard"
import Booking from "./pages/Booking"
import Explore from "./pages/Explore"
import ForgotPassword from "./pages/ForgotPassword"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import TrekDetails from "./pages/TrekDetails"
import UserProfile from "./pages/UserProfile"
function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token")
      if (token) {
        try {
          const response = await fetch("http://localhost:5000/api/user", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          if (response.ok) {
            const userData = await response.json()
            setIsAuthenticated(true)
            setIsAdmin(userData.isAdmin)
          } else {
            localStorage.removeItem("token")
            setIsAuthenticated(false)
            setIsAdmin(false)
          }
        } catch (error) {
          console.error("Error checking authentication:", error)
          setIsAuthenticated(false)
          setIsAdmin(false)
        }
      } else {
        setIsAuthenticated(false)
        setIsAdmin(false)
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  const setIsAuthenticatedCallback = useCallback((value) => {
    setIsAuthenticated(value)
  }, [])

  const PrivateRoute = useMemo(
    () =>
      ({ children }) => {
        if (isLoading) return <Loading />
        return isAuthenticated ? children : <Navigate to="/login" />
      },
    [isAuthenticated, isLoading],
  )

  const AdminRoute = useMemo(
    () =>
      ({ children }) => {
        if (isLoading) return <Loading />
        return isAuthenticated && isAdmin ? children : <Navigate to="/" />
      },
    [isAuthenticated, isAdmin, isLoading],
  )


  return (
    <Router>
<div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 dark:from-gray-100 dark:to-gray-200 text-white dark:text-gray-900">  
        <Navbar  isAuthenticated={isAuthenticated} isAdmin={isAdmin}
        />
        {isLoading ? (
          <Loading />
        ) : (
        <Routes>
          
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
<Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />                              <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contactmiddle />} />
           <Route path="/trek/:trekId" element={<TrekDetails />} />
           <Route path="/forgot-password" element={<ForgotPassword />} />
           <Route
              path="/booking/:trekId"
              element={
                <PrivateRoute>
                  <Booking />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <UserProfile setIsAuthenticated={setIsAuthenticatedCallback} />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/*"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
          </Routes>
        )}
        <Footer />
      </div>
    </Router>
  )
}

export default App

