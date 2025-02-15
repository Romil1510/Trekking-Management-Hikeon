import { BarChart2, BookOpen, LogOut, Star, Users } from "lucide-react"

const Sidebar = ({ activePanel, setActivePanel }) => {
  const menuItems = [
    { id: "users", icon: Users, label: "Users" },
    { id: "bookings", icon: BookOpen, label: "Bookings" },
    { id: "reviews", icon: Star, label: "Reviews" },
    { id: "statistics", icon: BarChart2, label: "Statistics" },
  ]

  return (
    <div className="bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <h2 className="text-2xl font-semibold text-center mb-6">Admin Dashboard</h2>
      <nav>
        {menuItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`block py-2.5 px-4 rounded transition duration-200 ${
              activePanel === item.id ? "bg-blue-500 text-white" : "hover:bg-gray-700"
            }`}
            onClick={() => setActivePanel(item.id)}
          >
            <item.icon className="inline-block mr-2 h-5 w-5" />
            {item.label}
          </a>
        ))}
      </nav>
      <div className="absolute bottom-0 w-full mb-6">
        <button className="block w-full py-2.5 px-4 rounded transition duration-200 hover:bg-red-600 text-center">
          <LogOut className="inline-block mr-2 h-5 w-5" />
          Logout
        </button>
      </div>
    </div>
  )
}

export default Sidebar

