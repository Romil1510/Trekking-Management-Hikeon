import { Glasses } from "lucide-react"
import React from "react"
import { Link } from "react-router-dom"

const vrCategories = [
  {
    id: 1,
    name: "Mountain Treks",
    description: "Experience breathtaking mountain views in virtual reality.",
    image: "/vr-images/mountain-treks.jpg",
  },
  {
    id: 2,
    name: "Underwater Adventures",
    description: "Dive into stunning underwater worlds without getting wet.",
    image: "/vr-images/underwater-adventures.jpg",
  },
  {
    id: 3,
    name: "Desert Expeditions",
    description: "Explore vast desert landscapes from the comfort of your home.",
    image: "/vr-images/desert-expeditions.jpg",
  },
]

const VRCard = ({ category }) => (
  <Link to={`/vr-experience/${category.id}`} className="block">
    <div className="bg-gray-800 dark:bg-gray-200 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
      <img src={category.image || "/placeholder.svg"} alt={category.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2 flex items-center text-white dark:text-gray-900">
          <Glasses className="mr-2 text-blue-400" />
          {category.name}
        </h3>
        <p className="text-sm text-gray-400 dark:text-gray-600">{category.description}</p>
      </div>
    </div>
  </Link>
)

const VRExperience = () => {
  return (
    <section className="py-20 px-4 bg-gray-900 dark:bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            VR Trekking Experiences
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vrCategories.map((category) => (
            <VRCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default VRExperience

