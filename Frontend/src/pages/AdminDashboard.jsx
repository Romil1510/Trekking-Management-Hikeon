"use client";
import { BookOpen, Mountain, PlusCircle, Star, Users } from "lucide-react";
import { Link, Route, Routes } from "react-router-dom";
import AddTreksPanel from "../component/admin/AddTreksPanel";
import BookingsPanel from "../component/admin/BookingsPanel";
import ReviewsPanel from "../component/admin/ReviewsPanel";
import TreksPanel from "../component/admin/TreksPanel";
import UsersPanel from "../component/admin/UsersPanel";

const AdminDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-6 fixed h-full shadow-lg transform transition-transform duration-300 ease-in-out hover:translate-x-0 -translate-x-full md:translate-x-0">
        <h2 className="text-2xl font-semibold mb-6 text-center mt-14">Admin Dashboard</h2>
        <nav>
          <ul className="space-y-3">
            <li>
              <Link
                to="/admin"
                className="flex items-center p-3 hover:bg-gray-700 rounded-lg transition-colors duration-200"
              >
                <Users className="mr-3" />
                Users
              </Link>
            </li>
            <li>
              <Link
                to="/admin/bookings"
                className="flex items-center p-3 hover:bg-gray-700 rounded-lg transition-colors duration-200"
              >
                <BookOpen className="mr-3" />
                Bookings
              </Link>
            </li>
            <li>
              <Link
                to="/admin/reviews"
                className="flex items-center p-3 hover:bg-gray-700 rounded-lg transition-colors duration-200"
              >
                <Star className="mr-3" />
                Reviews
              </Link>
            </li>
            <li>
              <Link
                to="/admin/add-trek"
                className="flex items-center p-3 hover:bg-gray-700 rounded-lg transition-colors duration-200"
              >
                <PlusCircle className="mr-3" />
                Add Trek
              </Link>
            </li>
            <li>
              <Link
                to="/admin/treks"
                className="flex items-center p-3 hover:bg-gray-700 rounded-lg transition-colors duration-200"
              >
                <Mountain className="mr-3" />
                Treks
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto ml-0 md:ml-64 mt-16">
        <Routes>
          <Route index element={<UsersPanel />} />
          <Route path="bookings" element={<BookingsPanel />} />
          <Route path="reviews" element={<ReviewsPanel />} />
          <Route path="treks" element={<TreksPanel />} />
          <Route
            path="add-trek"
            element={
              <AddTreksPanel
                onTrekAdded={() => {
                  /* Refresh treks */
                }}
              />
            }
          />
          <Route path="treks" element={<TreksPanel />} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminDashboard;