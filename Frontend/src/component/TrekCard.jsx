import { Calendar, CreditCard, MapPin, Mountain, Users } from "lucide-react"
import { Link } from "react-router-dom"

const TrekCard = ({ trek }) => (
  <Link to={`/trek/${trek._id}`} className="group block">
    <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-2 cursor-pointer">
      {/* Image Container with Hover Overlay */}
      <div className="relative overflow-hidden">
        <img 
          src={trek.image || "/placeholder.svg"} 
          alt={trek.name} 
          className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
      </div>

      {/* Content Container */}
      <div className="p-5">
        {/* Title and Location */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-white mb-1">{trek.name}</h3>
          <div className="flex items-center text-blue-400">
            <MapPin className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">{trek.location}</span>
          </div>
        </div>

        {/* Description with Gradient Fade */}
        <div className="relative mb-5">
          <p className="text-sm text-gray-300 leading-relaxed transition-all duration-300 group-hover:text-gray-100">
            {trek.description.substring(0, 100)}
            <span className="absolute right-0 bottom-0 w-8 h-5 bg-gradient-to-l from-gray-800/90 to-transparent" />
          </p>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center bg-gray-700/30 px-3 py-2 rounded-lg">
            <Calendar className="h-5 w-5 mr-2 text-blue-400" />
            <span className="text-gray-200">{trek.duration}</span>
          </div>
          <div className="flex items-center bg-gray-700/30 px-3 py-2 rounded-lg">
            <Mountain className="h-5 w-5 mr-2 text-green-400" />
            <span className="text-gray-200">{trek.difficulty}</span>
          </div>
          <div className="flex items-center bg-gray-700/30 px-3 py-2 rounded-lg">
            <Users className="h-5 w-5 mr-2 text-purple-400" />
            <span className="text-gray-200">{trek.maxGroupSize}</span>
          </div>
          <div className="flex items-center bg-gray-700/30 px-3 py-2 rounded-lg">
            <CreditCard className="h-5 w-5 mr-2 text-yellow-400" />
            <span className="font-medium text-green-300">
              Rs. {trek.price.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Hover Indicator */}
        <div className="absolute top-4 right-4 px-3 py-1 bg-gray-700/80 rounded-full text-xs font-medium text-emerald-300 transition-opacity duration-300 group-hover:opacity-0">
          View Details →
        </div>
      </div>
    </div>
  </Link>
)

export default TrekCard