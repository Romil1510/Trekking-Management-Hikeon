'use client';

import { Menu, Moon, Mountain, Settings, Sun, X } from 'lucide-react';
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ isDarkMode, toggleTheme, isAuthenticated, setIsAuthenticated, isAdmin }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserData = async () => {
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
            setUser(userData)
          } else {
            localStorage.removeItem("token")
            setIsAuthenticated(false)
          }
        } catch (error) {
          console.error("Error fetching user data", error)
        }
      }
    }
    if (isAuthenticated) {
      fetchUserData()
    }
  }, [isAuthenticated, setIsAuthenticated])

  const handleLogout = () => {
    localStorage.removeItem("token")
    setUser(null)
    setIsAuthenticated(false)
    navigate("/login")
  }

  return (
    <nav className="fixed w-full z-50 bg-gray-900 py-3">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Mountain className="h-10 w-10 text-blue-500" />
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              Hikeon
            </span>
          </Link>
          <div className="hidden md:flex space-x-2 text-xl">
            {[
              { name: "Home", path: "/" },
              { name: "Explore", path: "/explore" },
              { name: "About", path: "/about" },
              { name: "Contact", path: "/contact" },
            ].map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="px-3 py-2 rounded-md text-[18px] font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
              >
                {item.name}
              </Link>
            ))}
            {isAuthenticated && user ? (
              <div className="relative group">
                <button className="flex items-center px-3 py-2 rounded-md">
                  <img
                    src={user.profilePicture || "/placeholder.svg"}
                    alt={user.name}
                    className="w-8 h-8 rounded-full mr-2 object-cover"
                  />
                  <span className="text-gray-300">{user.name}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 hidden group-hover:block">
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">
                    Profile
                  </Link>
                  {isAdmin && (
                    <Link to="/admin" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">
                      <Settings className="inline-block mr-2" size={16} />
                      Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
              >
                Login
              </Link>
            )}
            <button onClick={toggleTheme} className="p-2 rounded-full bg-gray-700 text-gray-300 hover:bg-gray-600">
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
          <div className="md:hidden flex items-center">
            {isAuthenticated && user && (
              <img
                src={user.profilePicture || "/placeholder.svg"}
                alt={user.name}
                className="w-8 h-8 rounded-full mr-2 object-cover"
              />
            )}
            <button onClick={toggleTheme} className="p-2 rounded-full bg-gray-700 text-gray-300 hover:bg-gray-600 mr-2">
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              className="text-gray-300 hover:text-white focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {[
              { name: "Home", path: "/" },
              { name: "Explore", path: "/explore" },
              { name: "About", path: "/about" },
              { name: "Contact", path: "/#contact" },
              isAuthenticated ? { name: "Profile", path: "/profile" } : { name: "Login", path: "/login" },
            ].map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            {isAuthenticated && isAdmin && (
              <Link
                to="/admin"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Settings className="inline-block mr-2" size={16} />
                Admin Panel
              </Link>
            )}
            {isAuthenticated && (
              <button
                onClick={() => {
                  handleLogout()
                  setIsMenuOpen(false)
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar