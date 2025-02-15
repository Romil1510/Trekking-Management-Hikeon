import React from "react"
import { getRecentTreks } from "../data/recommandedTreks"
import CardSlider from "./CardSlider"

const Recommanded = () => {
  const recentTreks = getRecentTreks()

  return (
    <section className="py-20 px-4 relative">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          Upcoming Treks
          </span>
        </h2>
        <CardSlider treks={recentTreks} />
      </div>
    </section>
  )
}

export default Recommanded

