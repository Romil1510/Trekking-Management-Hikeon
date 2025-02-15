import { Calendar, CreditCard, Flame, MapPin, Mountain, Users } from "lucide-react"
import React from "react"
import { Link } from "react-router-dom"
import { getTrendingTreks } from "../data/treks"

const TrekCard = ({ trek }) => (
  <Link to={`/trek/${trek.id}`} className="group block relative">
    <div className="relativebg-gradient-to-b from-gray-900 via-blue-900/20 to-gray-900 rounded-2xl overflow-hidden shadow-2xl hover:shadow-4xl transition-all duration-500 hover:-translate-y-3 cursor-pointer">
      {/* Trending Badge */}
      <div className="absolute top-4 left-4 z-20 flex items-center bg-gradient-to-r from-orange-500 to-red-600 px-4 py-2 rounded-full">
        <Flame className="h-4 w-4 mr-2 text-white" />
        <span className="text-xs font-bold text-white">TRENDING</span>
      </div>

      {/* Image Container */}
      <div className="relative overflow-hidden aspect-video">
        <img 
          src={trek.image || "/placeholder.svg"} 
          alt={trek.name} 
          className="w-full h-full object-cover transform transition-all duration-700 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />
      </div>

      {/* Content Container */}
      <div className="p-6">
        {/* Title and Location */}
        <div className="mb-4">
          <h3 className="text-2xl font-bold text-white mb-2">{trek.name}</h3>
          <div className="flex items-center text-blue-300">
            <MapPin className="h-5 w-5 mr-2" />
            <span className="text-base font-medium">{trek.location}</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center space-x-3 bg-gray-700/40 p-3 rounded-xl">
            <Calendar className="h-6 w-6 text-blue-400" />
            <div>
              <p className="text-xs text-gray-400">Duration</p>
              <p className="text-sm font-medium text-white">{trek.duration}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 bg-gray-700/40 p-3 rounded-xl">
            <Mountain className="h-6 w-6 text-green-400" />
            <div>
              <p className="text-xs text-gray-400">Difficulty</p>
              <p className="text-sm font-medium text-white">{trek.difficulty}</p>
            </div>
          </div>
        </div>

        {/* Price and Group Size */}
        <div className="flex justify-between items-center border-t border-gray-700/50 pt-4">
          <div className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-purple-400" />
            <span className="text-sm font-medium text-gray-300">
              Max {trek.maxGroupSize} people
            </span>
          </div>
          <div className="flex items-center space-x-2 bg-gradient-to-r from-purple-700 to-purple-500 px-4 py-2 rounded-full">
            <CreditCard className="h-5 w-5 text-white" />
            <span className="text-lg font-bold text-white">
              Rs. {trek.price.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 hidden group-hover:block border-4 border-white/10 rounded-2xl" />
    </div>
  </Link>
)

const TrendingTreks = () => {
  const trendingTreks = getTrendingTreks()

  return (
    <section id="trending" className="py-24 px-6 lg:px-12 bg-gray-900/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              Trending Adventures
            </span>
          </h2>
          <p className="text-xl text-gray-400">Most popular experiences this season</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {trendingTreks.map((trek) => (
            <TrekCard key={trek.id} trek={trek} />
          ))}
        </div>

       
      </div>
    </section>
  )
}

export default TrendingTreks