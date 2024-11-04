import React, { useEffect, useState } from 'react'
import BannerImage from '../bannerimg.jpg'
import axios from 'axios'
function Banner({apiKey}) {
  const [banner,setBanner] = useState(null)
  const [title,setTitle] = useState('')
  const baseImageUrl = 'https://image.tmdb.org/t/p/original';
  

  useEffect(()=>{
    const fetchBanner = async()=>{
      const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`)
      const movies=response.data.results;
      if(movies.length > 0){
        const randomMovie=movies[Math.floor(Math.random() * movies.length)];
        setBanner(`${baseImageUrl}${randomMovie.backdrop_path}`)
        setTitle(randomMovie.original_title)

        const interval=setInterval(() => {
          const randomMovie=movies[Math.floor(Math.random() * movies.length)];
          setBanner(`${baseImageUrl}${randomMovie.backdrop_path}`)
          setTitle(randomMovie.original_title)
          
          }, 60000);
          return()=>clearInterval(interval)
      }
     
    }
    fetchBanner()
  },[])
  return (
    <div className='relative h-[20vh] md:h-[90vh] bg-cover bg-top bg-no-repeat flex items-end'
    style={{
      backgroundImage: `url(${banner})`,
      opacity  : 1.5,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      transition: 'background-image 1s ease-in-out'
    }}>
 <div className='absolute inset-0 bg-black opacity-50'></div> 
 <div className='relative z-10 text-white w-full p-2 text-center font-bold'>{title}</div>
 <p className="absolute inset-0 flex items-center justify-center text-5xl text-white z-20 ">Discover Your Next Favorite!</p>
</div>
  )
}

export default Banner
