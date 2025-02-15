import { Calendar, DollarSign, Mountain, Star, Users } from "lucide-react"
import React, { useEffect, useMemo, useState } from "react"
import { toast } from "react-hot-toast"
import { Link } from "react-router-dom"
import SeasonSelect from "../component/SeasonSelect"
import allTreks from "../data/allTreks"

const TrekCard = ({ trek }) => (
  <Link to={`/trek/${trek.id}`} className="group block relative h-full">
    <div className="h-full bg-gradient-to-br from-gray-800/60 to-gray-900/40 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 border border-white/10 hover:border-white/20">
      {/* Image Container */}
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={trek.image || "/placeholder.svg"} 
          alt={trek.name} 
          className="w-full h-full object-cover transform transition-all duration-700 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent" />
        
        {/* Season Badge */}
        <div className="absolute top-4 right-4 px-3 py-1.5 bg-black/40 rounded-full backdrop-blur-sm text-xs font-medium text-emerald-300">
          Best Season: {trek.bestSeason}
        </div>
      </div>

      {/* Content Container */}
      <div className="p-6">
        {/* Title and Rating */}
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-bold text-white pr-2">{trek.name}</h3>
          <div className="flex items-center bg-gradient-to-r from-amber-400 to-orange-500 px-2.5 py-1 rounded-full">
            <Star className="h-4 w-4 mr-1 text-white" />
            <span className="text-sm font-bold text-white">{trek.rating || 4.8}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-300 mb-6 leading-relaxed line-clamp-3 group-hover:text-gray-100 transition-colors">
          {trek.description}
        </p>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-3 bg-gray-700/30 p-3 rounded-xl">
            <Calendar className="h-6 w-6 text-blue-400" />
            <div>
              <p className="text-xs text-gray-400">Duration</p>
              <p className="text-sm font-medium text-white">{trek.duration}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 bg-gray-700/30 p-3 rounded-xl">
            <Mountain className="h-6 w-6 text-green-400" />
            <div>
              <p className="text-xs text-gray-400">Difficulty</p>
              <p className="text-sm font-medium text-white">{trek.difficulty}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 bg-gray-700/30 p-3 rounded-xl">
            <Users className="h-6 w-6 text-purple-400" />
            <div>
              <p className="text-xs text-gray-400">Group Size</p>
              <p className="text-sm font-medium text-white">{trek.groupSize}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 bg-gray-700/30 p-3 rounded-xl">
            <DollarSign className="h-6 w-6 text-yellow-400" />
            <div>
              <p className="text-xs text-gray-400">Price</p>
              <p className="text-sm font-medium text-white">${trek.price}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 hidden group-hover:block border-4 border-white/10 rounded-2xl pointer-events-none" />
    </div>
  </Link>
)

const Explore = () => {
  const [treks, setTreks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedSeason, setSelectedSeason] = useState("all")

  const filteredTreks = useMemo(() => {
    if (selectedSeason === "all") return Object.values(allTreks)

    const seasonTreks = Object.values(allTreks).filter((trek) => {
      if (selectedSeason === "summer")
        return (
          trek.bestSeason.toLowerCase().includes("june") ||
          trek.bestSeason.toLowerCase().includes("july") ||
          trek.bestSeason.toLowerCase().includes("august")
        )
      if (selectedSeason === "winter")
        return (
          trek.bestSeason.toLowerCase().includes("december") ||
          trek.bestSeason.toLowerCase().includes("january") ||
          trek.bestSeason.toLowerCase().includes("february")
        )
      if (selectedSeason === "monsoon")
        return (
          trek.bestSeason.toLowerCase().includes("july") ||
          trek.bestSeason.toLowerCase().includes("august") ||
          trek.bestSeason.toLowerCase().includes("september")
        )
      return false
    })

    return seasonTreks.slice(0, 7)
  }, [selectedSeason])

  useEffect(() => {
    fetchTreks()
  }, [])

  const fetchTreks = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/treks")
      if (!response.ok) {
        throw new Error("Failed to fetch treks")
      }
      const data = await response.json()
      setTreks(data)
    } catch (error) {
      toast.error("Error fetching treks: " + error.message)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) return <div>Loading...</div>

  return (
    <div className="min-h-screen py-24 px-4 sm:px-6 lg:px-8 bg-[url('/stars-bg.jpg')] bg-cover bg-fixed" id="explore">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center mb-16">
          <h1 className="text-5xl font-bold text-center mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
              Explore Treks
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 text-center">
            Discover adventures across all seasons
          </p>
          <SeasonSelect onSeasonChange={setSelectedSeason} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTreks.map((trek) => (
            <TrekCard key={trek.id} trek={trek} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Explore