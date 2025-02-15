import React from 'react'
import Harkidun from "../../data/Harkidun.jpg"
import Himptapass from '../../data/Himptapass.jpg'
import photo1 from '../../data/photo1.jpg'
import photo10 from '../../data/photo10.jpg'
import photo11 from '../../data/photo11.jpg'
import photo12 from '../../data/photo12.jpg'
import photo13 from '../../data/photo13.jpg'
import photo2 from '../../data/photo2.jpg'
import photo3 from '../../data/photo3.jpg'
import photo4 from '../../data/photo4.jpg'
import photo5 from '../../data/photo5.jpg'
import photo6 from '../../data/photo6.jpg'
import photo7 from '../../data/photo7.jpg'
import photo8 from '../../data/photo8.jpg'
import photo9 from '../../data/photo9.jpg'

import './Photos.css'
const Photos = () => {



  return (
    <div className='bg-gray-900'>
    <h2 className='text-2xl sm:text-3xl flex justify-center gap-2 text-center text-white font-semibold  mb-5'>Photos Gallary  <span className=' justify-center items-center flex text-white'>(HikeON)</span></h2>
<div className="overflow-hidden box  px-4">
<div className="flex overflow-x-scroll  scrollbar-hide space-x-1">
    
    
    <img src={photo1}/>
    
    <img src={photo2}/>
    <img src={photo3}/>
    <img src={photo4}/>
    <img src={photo5}/>
    <img src={photo6}/>
    <img src={photo7}/>
    <img src={photo8}/>
    <img src={photo9}/>
    <img src={photo10}/>
    <img src={photo11}/>
    <img src={photo12}/>
    <img src={photo13}/>
    <img src={photo1}/>
    <img src={photo2}/>
    <img src={photo3}/>
    <img src={photo4}/>
   
    <img src={Harkidun}/>
    <img src={Himptapass}/>
    
</div>
</div>
</div>
  )

}

export default Photos
