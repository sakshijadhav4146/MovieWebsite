import React from 'react'
import BannerImage from '../bannerimg.jpg'
function Banner() {
  return (
    <div className='h-[20vh] md:h-[75vh] bg-cover bg-top bg-no-repeat flex items-end' style={{backgroundImage : `url(${BannerImage})`}}>
     <div className='text-white  bg-black bg-opacity-45 w-full p-2 text-center font-bold'>FIGHTER</div>
    </div>
  )
}

export default Banner
