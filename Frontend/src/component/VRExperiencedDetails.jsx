import { ArrowLeft, Glasses } from "lucide-react"
import React from "react"
import { Link, useParams } from "react-router-dom"

const vrExperiences = {
  1: [
    { id: 1, name: "Everest Base Camp", image: "/vr-images/everest-base-camp.jpg" },
    { id: 2, name: "Machu Picchu", image: "/vr-images/machu-picchu.jpg" },
    { id: 3, name: "Mount Fuji", image: "/vr-images/mount-fuji.jpg" },
    { id: 4, name: "Swiss Alps", image: "/vr-images/swiss-alps.jpg" },
  ],
  2: [
    { id: 1, name: "Great Barrier Reef", image: "/vr-images/great-barrier-reef.jpg" },
    { id: 2, name: "Galapagos Islands", image: "/vr-images/galapagos.jpg" },
    { id: 3, name: "Maldives Coral Gardens", image: "/vr-images/maldives-coral.jpg" },
    { id: 4, name: "Caribbean Sea", image: "/vr-images/caribbean-sea.jpg" },
  ],
  3: [
    { id: 1, name: "Sahara Desert", image: "/vr-images/sahara-desert.jpg" },
    { id: 2, name: "Atacama Desert", image: "/vr-images/atacama-desert.jpg" },
    { id: 3, name: "Gobi Desert", image: "/vr-images/gobi-desert.jpg" },
    { id: 4, name: "Arabian Desert", image: "/vr-images/arabian-desert.jpg" },
  ],
}

const VRExperienceDetail = () => {
  const { id } = useParams()
  const experiences = vrExperiences[id] || []

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-4">
      <div className="container mx-auto">
        <Link to="/vr-experience" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-8">
          <ArrowLeft className="mr-2" />
          Back to VR Experiences
        </Link>
        <h1 className="text-4xl font-bold mb-8">VR Trekking Experiences</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {experiences.map((exp) => (
            <div key={exp.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
              <img src={exp.image || "/placeholder.svg"} alt={exp.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <Glasses className="mr-2 text-blue-400" />
                  {exp.name}
                </h3>
                <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                  Start VR Experience
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default VRExperienceDetail

