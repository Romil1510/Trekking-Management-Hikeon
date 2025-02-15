import { Calendar, Camera, CheckCircle, Cloud, MapPin, Mountain, Thermometer, Users } from "lucide-react"
import React, { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import Recommanded from "../component/Recommanded"
import Reviews from "../component/Reviews"
import { getTrekById } from "../data/allTreks"

const TrekDetails = () => {
  const { trekId } = useParams()
  const navigate = useNavigate()
  const trek = getTrekById(trekId)
  const [selectedImage, setSelectedImage] = useState(null)
  const [weather, setWeather] = useState(null) // Add weather state

  // Sample gallery images - in a real app, these would come from your backend
  const galleryImages = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      caption: "Mountain Peak View"
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1476&q=80",
      caption: "Sunrise at Camp"
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1476&q=80",
      caption: "Mountain Lake"
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      caption: "Trail Path"
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1464278533981-50106e6176b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1474&q=80",
      caption: "Mountain Range"
    },
    {
      id: 6,
      url: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1473&q=80",
      caption: "Valley View"
    }
  ]

  useEffect(() => {
    if (trek?.location) {
      const apiKey = '760db203660c7b147f2fb60f9459ffcb' // Replace with your API key
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${trek.location}&units=metric&appid=${apiKey}`
      
      fetch(url)
        .then(response => response.json())
        .then(data => setWeather(data))
        .catch(error => console.error('Error fetching weather:', error))
    }
  }, [trek])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [trekId])

  if (!trek) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Trek not found</h2>
          <button
            onClick={() => navigate("/explore")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Explore Other Treks
          </button>
        </div>
      </div>
    )
  }

  const gst = trek.price * 0.18
  const totalPrice = trek.price + gst

  return (
    <div className="min-h-screen bg-gray-900 py-20 px-4">
      <div className="max-w-[90%] mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center text-white">{trek.name}</h1>
        <img
          src={trek.image || "/placeholder.svg"}
          alt={trek.name}
          className="w-full h-[400px] object-cover rounded-lg mb-8"
        />
<div className="p-2">
  <h2 className="text-2xl font-bold mb-4 text-white">About</h2>
  <p className="text-[18px] font-semibold mb-4 text-white">{trek.description}</p>
</div>

        
<div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-20">
          <div className="lg:col-span-3">
            {/* Key Features */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
              {[
                { icon: Calendar, value: trek.duration, color: 'text-blue-400' },
                { icon: MapPin, value: trek.difficulty, color: 'text-green-400' },
                { icon: Users, value: `Group: ${trek.groupSize}`, color: 'text-purple-400' },
                { icon: Mountain, value: `Altitude: ${trek.altitude}`, color: 'text-red-400' },
                { icon: Thermometer, value: trek.bestSeason, color: 'text-orange-400' },
                { icon: Cloud, 
                  value: weather?.main ? 
                    `${Math.round(weather.main.temp)}°C, ${weather.weather[0].main}` : 
                    'Loading...', 
                  color: 'text-yellow-400' 
                },
              ].map((item, index) => (
                <div 
                  key={index}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-4 transition-all hover:bg-white/10"
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className={`h-8 w-8 ${item.color}`} />
                    <span className="text-lg font-medium text-gray-200">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>


          {/* Itinerary Section */}
          <section className="mb-20">
              <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
                <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                  Journey Breakdown
                </span>
              </h2>
              <div className="space-y-4 relative before:absolute before:left-8 before:h-full before:w-1 before:bg-gradient-to-b from-blue-500/30 to-purple-500/30">
                {trek.itinerary.map((day, index) => (
                  <div 
                    key={index}
                    className="relative pl-16 group"
                  >
                    <div className="absolute left-8 top-4 -ml-3.5 w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                      <span className="text-white font-bold">{day.day}</span>
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 transition-all hover:bg-white/10">
                      <h3 className="text-xl font-semibold text-white mb-2">{day.title}</h3>
                      <p className="text-gray-300 leading-relaxed">{day.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              </section>

            {/* Packing List */}
            <section className="mb-20">
              <h2 className="text-3xl font-bold text-white mb-8">
                <span className="bg-gradient-to-r from-green-500 to-cyan-500 bg-clip-text text-transparent">
                  Essential Gear
                </span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {trek.packingList.map((item, index) => (
                  <div 
                    key={index}
                    className="flex items-center space-x-3 bg-white/5 backdrop-blur-sm rounded-xl p-4 transition-all hover:bg-white/10"
                  >
                    <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0" />
                    <span className="text-gray-200">{item}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>


         {/* Booking Card */}
         <div className="lg:col-span-1">
            <div className="bg-gradient-to-b from-blue-500/20 to-purple-500/20 backdrop-blur-lg rounded-2xl p-6 border border-white/10 shadow-2xl sticky top-24">
              <h2 className="text-2xl font-bold text-white mb-6">Adventure Package</h2>
              <div className="space-y-5 mb-8">
                <div className="flex justify-between items-center pb-2 border-b border-white/10">
                  <span className="text-gray-300">Base Price</span>
                  <span className="text-xl font-semibold text-white">₹{trek.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-white/10">
                  <span className="text-gray-300">GST (18%)</span>
                  <span className="text-xl font-semibold text-white">₹{gst.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 font-bold">Total</span>
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    ₹{totalPrice.toLocaleString()}
                  </span>
                </div>
              </div>
              <Link
                to={`/booking/${trek.id}`}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center transition-all transform hover:scale-[1.02]"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>

       {/* Why Choose Section */}
         <div className="bg-gradient-to-br from-gray-800/30 to-blue-900/30 backdrop-blur-sm rounded-2xl p-8 mb-20 border border-white/10">
          <h2 className="text-3xl font-bold text-white mb-8">
            <span className="bg-gradient-to-r from-green-500 to-cyan-500 bg-clip-text text-transparent">
              Why HikeOn?
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "Expert guides with 10+ years experience",
              "Military-grade safety protocols",
              "Intimate groups (max 12 adventurers)",
              "Eco-conscious travel philosophy",
              "Authentic cultural immersion",
            ].map((reason, index) => (
              <div 
                key={index}
                className="flex items-start space-x-4 bg-white/5 p-4 rounded-xl transition-all hover:bg-white/10"
              >
                <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0 mt-1" />
                <p className="text-gray-200 leading-relaxed">{reason}</p>
              </div>
            ))}
          </div>
        </div>


        {/* Image Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="max-w-4xl w-full">
              <img
                src={selectedImage.url}
                alt={selectedImage.caption}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              />
              <p className="text-white text-center mt-4 text-lg">{selectedImage.caption}</p>
            </div>
          </div>
        )}

            {/* Photo Gallery Section */}
            <div className="mb-12">
              <h2 className="text-2xl font-semibold mb-6 text-white flex items-center">
                <Camera className="h-6 w-6 mr-2 text-blue-500" />
                Photo Gallery
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {galleryImages.map((image) => (
                  <div
                    key={image.id}
                    className="relative group cursor-pointer overflow-hidden rounded-lg"
                    onClick={() => setSelectedImage(image)}
                  >
                    <img
                      src={image.url}
                      alt={image.caption}
                      className="w-full h-48 object-cover transform transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 flex items-center justify-center">
                      <p className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center px-2">
                        {image.caption}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
            <Reviews/>
            </div>
        <div>
          <Recommanded />
        </div>
      </div>
    </div>
  )
}

export default TrekDetails