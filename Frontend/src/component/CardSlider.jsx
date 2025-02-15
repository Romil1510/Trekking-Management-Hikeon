import { ChevronLeft, ChevronRight } from "lucide-react"
import React, { useState } from "react"
import TrekCard from "./TrekCard"

const CardSlider = ({ treks }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 3) % treks.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 3 + treks.length) % treks.length)
  }

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 33.33}%)` }}
        >
          {treks.map((trek) => (
            <div key={trek.id} className="w-full md:w-1/3 flex-shrink-0 p-2">
              <TrekCard trek={trek} />
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 dark:bg-gray-200 p-2 rounded-full"
      >
        <ChevronLeft className="text-white dark:text-gray-800" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 dark:bg-gray-200 p-2 rounded-full"
      >
        <ChevronRight className="text-white dark:text-gray-800" />
      </button>
    </div>
  )
}

export default CardSlider

