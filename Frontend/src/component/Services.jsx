import { Camera, Coffee, Compass, Shield, Users, Wifi } from "lucide-react"
import React from "react"

const services = [
  { icon: Compass, name: "Expert Navigation", description: "State-of-the-art GPS and mapping technology" },
  { icon: Shield, name: "Safety First", description: "Advanced safety protocols and emergency response" },
  { icon: Users, name: "Small Groups", description: "Intimate trekking experiences with like-minded adventurers" },
  { icon: Camera, name: "Capture Memories", description: "Professional photography and videography services" },
  { icon: Wifi, name: "Stay Connected", description: "Satellite internet access on select treks" },
  { icon: Coffee, name: "Gourmet Meals", description: "Delicious and nutritious meals prepared by expert chefs" },
]

const Services = () => {
  return (
    <section id="services" className="py-20 px-6">
      <h2 className="text-4xl font-bold mb-12 text-center">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">Our Services</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {services.map((service) => (
          <div key={service.name} className="bg-gray-800 rounded-lg p-6 text-center">
            <service.icon className="h-12 w-12 mx-auto mb-4 text-blue-500" />
            <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
            <p className="text-gray-400">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Services

