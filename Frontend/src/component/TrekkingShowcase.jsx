import { Compass, Map, Mountain } from "lucide-react"
import React from "react"
const showcaseData = [
  { id: 1, title: "Mountain Peaks", icon: Mountain, description: "Conquer the highest summits" },
  { id: 2, title: "Scenic Trails", icon: Map, description: "Explore breathtaking landscapes" },
  { id: 3, title: "Adventure Routes", icon: Compass, description: "Discover hidden gems" },
]

const TrekkingShowcase = () => {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-gray-900 via-blue-900/20 to-gray-900">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center text-white">Discover Your Next Adventure</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {showcaseData.map((item) => (
            <div
              key={item.id}
              className="bg-gray-800 rounded-lg p-6 transform hover:scale-105 transition-transform duration-300"
            >
              <item.icon className="h-12 w-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-white">{item.title}</h3>
              <p className="text-gray-300">{item.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 h-[125px]">
          <div className="bg-gray-800 rounded-lg overflow-hidden">
            
            <div className="p-6 ">
              <h3 className="text-xl font-semibold mb-2 text-white">Futuristic Trekking Gear</h3>
              <p className="text-gray-300">Experience the future of hiking with cutting-edge equipment</p>
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg overflow-hidden">
            
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-white">Live Weather Update</h3>
              <p className="text-gray-300">Preview your trek with Live Weather technology</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TrekkingShowcase

