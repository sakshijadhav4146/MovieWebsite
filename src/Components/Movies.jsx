import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import axios from "axios";
import Pagitation from "./Pagitation";
function Movies({apiKey,handleAddtoWatchlist,handleRemoveFromWatchList ,watchList, mode}) {
  const [movies,setmovies]=useState([])
  const [pageNo,setpageNo]=useState(1);
  const [loading,setloading]=useState(true);
  const handlePrev=()=>{
    setpageNo(pageNo-1)
  }
  const handleNext=()=>{
    setpageNo(pageNo+1)
  }
  useEffect(() => {
    //using fetch->
    // const fetchdata=async()=>{
    //   const response=await fetch('https://api.themoviedb.org/3/movie/popular?api_key=&language=en-US&page=3')
    //   const data=await response.json();
    //   console.log(data);  
    // }
    // fetchdata();


    //using axios
   setloading(true)
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${pageNo}`).then((res)=>{
      setmovies(res.data.results);//when we put only res it is giving whole header we want only results so it is in data.results
      
    })
    setloading(false)
   
  },[pageNo]);
 
  return (
    <div>
      <div className="text-4xl font-extrabold text-center p-8"><i className="fa-solid fa-star text-yellow-600 m-3"></i>Popular Choices<i className="fa-solid fa-star text-yellow-600 m-3"></i></div>
     {loading?(<div className="text-3xl">loading...</div>):(

      <div className="flex flex-row flex-wrap justify-around">
        {movies.map(items=>{
           return <MovieCard  /////////////movie cards items
           key={items.id}
           poster_path={items.poster_path}
          // original_title={items.original_title.length <15 ?items.original_title:`${items.original_title.substring(0,10)}...`} 
          original_title={items.original_title}
          handleAddtoWatchlist={handleAddtoWatchlist}
          handleRemoveFromWatchList={handleRemoveFromWatchList}
          items={items}
          watchList={watchList}
           />
        })}
       
      </div>

)}

{/*------------ footer for next page----------- */}
      <Pagitation handlePrev={handlePrev} handleNext={handleNext} pageNo={pageNo} mode={mode}/>
    </div>
  );
}

export default Movies;


