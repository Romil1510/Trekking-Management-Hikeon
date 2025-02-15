import React from "react"
import About from "../component/About"
import Contactmiddle from "../component/Contactmiddle"
import Photos from "../component/Gallary/Photos"
import Hero from "../component/Hero"
import RecentTreks from "../component/RecentTreks"
import Reviews from "../component/Reviews"
import Services from "../component/Services"
import TrekkingShowcase from "../component/TrekkingShowcase"
import TrendingTreks from "../component/TrendingTreks"
function Home() {

  return (
    <>
      <Hero/>
      <TrendingTreks/>
    
  
      
  
      <RecentTreks/>
      <Services/>
     <TrekkingShowcase/>
      <About />
      <Reviews />
      <Photos/>
      <Contactmiddle/>
    </>
  )
}

export default Home

