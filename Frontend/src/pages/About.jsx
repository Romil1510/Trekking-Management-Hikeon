import { Globe, Heart, Leaf, Mountain, Shield, Users } from "lucide-react"
import React from "react"

const About = () => {
  return (
    <div className="min-h-screen bg-gray-900 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold mb-12 text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Embark on a Journey with Hikeon
          </span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <p className="text-lg mb-6 text-gray-300 font-semibold">
              At Hikeon, we don't just organize treks; we craft life-changing adventures that push boundaries and create
              lasting memories. Born from a passion for exploration and a deep respect for nature, Hikeon has been
              guiding intrepid souls through the world's most breathtaking landscapes since 2010.
            </p>
            <p className="text-lg mb-6 text-gray-300 font-semibold">
              Our journey began with a simple idea: to share the transformative power of trekking with people from all
              walks of life. Today, we've grown into a community of adventurers, conservationists, and cultural
              enthusiasts, united by our love for the great outdoors and our commitment to responsible travel.
            </p>
            <p className="text-lg mb-6 text-gray-300 font-semibold">
              What sets Hikeon apart is our unwavering dedication to authenticity, safety, and sustainability. We
              believe that the best adventures are those that challenge you, connect you with local cultures, and leave
              a positive impact on the environments we explore.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="text-center">
              <Mountain className="h-16 w-16 mx-auto mb-4 text-blue-500" />
              <h3 className="text-2xl font-semibold mb-2 text-gray-200">Uncharted Territories</h3>
              <p className="text-gray-400">Discover hidden gems and off-the-beaten-path destinations</p>
            </div>
            <div className="text-center">
              <Users className="h-16 w-16 mx-auto mb-4 text-blue-500" />
              <h3 className="text-2xl font-semibold mb-2 text-gray-200">Tight-Knit Groups</h3>
              <p className="text-gray-400">Form lifelong friendships with like-minded adventurers</p>
            </div>
            <div className="text-center">
              <Shield className="h-16 w-16 mx-auto mb-4 text-blue-500" />
              <h3 className="text-2xl font-semibold mb-2 text-gray-200">Uncompromising Safety</h3>
              <p className="text-gray-400">State-of-the-art equipment and highly trained guides</p>
            </div>
            <div className="text-center">
              <Globe className="h-16 w-16 mx-auto mb-4 text-blue-500" />
              <h3 className="text-2xl font-semibold mb-2 text-gray-200">Cultural Immersion</h3>
              <p className="text-gray-400">Engage with local communities and traditions</p>
            </div>
          </div>
        </div>
        <div className="mt-12">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-200">Our Commitment to the Planet</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start">
              <Leaf className="h-8 w-8 mr-4 text-green-500 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-200">Environmental Stewardship</h3>
                <p className="text-gray-300">
                  We actively participate in conservation efforts, practice Leave No Trace principles, and partner with
                  eco-friendly accommodations to minimize our footprint.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <Heart className="h-8 w-8 mr-4 text-red-500 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-200">Community Support</h3>
                <p className="text-gray-300">
                  By employing local guides and supporting community projects, we ensure that tourism benefits the
                  regions we visit, preserving their natural beauty and cultural heritage.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 text-center">
          <p className="text-lg text-gray-300">
            Join us at Hikeon, and let's write the next chapter of your adventure story together. The mountains are
            calling, and we must go!
          </p>
        </div>
      </div>
    </div>
  )
}

export default About

