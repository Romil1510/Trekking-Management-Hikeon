import { ArrowRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import wallpaper3 from "../data/wallpaper1.jpg"; // Add more wallpapers
import wallpaper2 from "../data/wallpaper2.jpeg"; // Add more wallpapers
import wallpaper1 from "../data/wallpaper3.jpeg";

const Hero = () => {
  const [textIndex, setTextIndex] = useState(0)
  const [backgroundIndex, setBackgroundIndex] = useState(0)
  const heroTexts = [
    "Explore the World, One Trek at a Time",
    "Discover Hidden Trails and Breathtaking Views",
    "Challenge Yourself, Conquer Mountains",
    "Create Unforgettable Memories in Nature",
    "Experience the Thrill of Adventure",
  ]

  const backgrounds = [wallpaper1, wallpaper2, wallpaper3] // Add more images here

  // Text rotation effect
  useEffect(() => {
    const textInterval = setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % heroTexts.length)
    }, 5000)

    return () => clearInterval(textInterval)
  }, [])

  // Background rotation effect
  useEffect(() => {
    const backgroundInterval = setInterval(() => {
      setBackgroundIndex((prevIndex) => (prevIndex + 1) % backgrounds.length)
    }, 5000) // 5 minutes

    return () => clearInterval(backgroundInterval)
  }, [])

  return (
    <section className="relative min-h-[650px] flex items-center justify-center overflow-hidden">
      {/* Dynamic Background Images */}
      <div className="absolute inset-0 z-0">
        {backgrounds.map((bg, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === backgroundIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={bg}
              alt="Background"
              className="w-full h-full object-cover object-center transform scale-105 animate-soft-zoom"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-purple-50/30 to-indigo-50/20 mix-blend-soft-light" />
            <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <div className="inline-flex flex-col items-center space-y-8">
          {/* Animated Text */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 animate-soft-shimmer">
            <span className="block animate-soft-fade-in-out">{heroTexts[textIndex]}</span>
          </h1>

          {/* Subtitle with Soft Glow */}
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-900 font-medium drop-shadow-sm">
            Experience breathtaking adventures with cutting-edge gear and expert guides across all seasons.
          </p>

          {/* Soft Animated Button */}
          <a
            href="/explore"
            className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full font-bold text-white tracking-wide overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30"
          >
            <span className="relative z-10 flex items-center">
              <span className="mr-3">Discover Treks</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </a>
        </div>

        {/* Soft Scroll Indicator */}
        <div className="mt-16 flex justify-center">
          <div className="w-8 h-14 rounded-3xl border-2 border-purple-900/50 flex justify-center items-start p-1.5">
            <div className="w-3 h-3 bg-purple-900 rounded-full animate-soft-scroll" />
          </div>
        </div>
      </div>

      {/* Soft Particle Animation */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-purple-300/20 rounded-full animate-soft-particle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 5 + 5}s`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Soft Glowing Orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-48 h-48 bg-purple-300/10 rounded-full blur-3xl animate-soft-float" />
        <div className="absolute bottom-40 right-32 w-32 h-32 bg-indigo-300/10 rounded-full blur-2xl animate-soft-float-delayed" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-purple-200/10 rounded-full blur-3xl animate-soft-float-slow" />
      </div>
    </section>
  )
}

export default Hero