import React, { useEffect } from "react";
import Navbar from "./Components/Navbar";
import Watchlist from "./Components/Watchlist";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Movies from "./Components/Movies";
import Banner from "./Components/Banner";
import { useState } from "react";
import MovieDetails from "./Components/MovieDetails";

function App() {
  const [mode,setMode] = useState("white");
  const [watchList,setwatchList]=useState([])
  const apiKey=import.meta.env.REACT_APP_MOVIE_API
  
  
  
  
  
  const changeMode=()=>{
    if(mode === "white"){
      document.body.style.backgroundColor="#0c1512";
      document.body.style.color="white"
      setMode("black")
    }
    else{
       document.body.style.backgroundColor="white";
       document.body.style.color="black"
       setMode("white")
    }
  }


  const handleAddtoWatchlist = (movieobj)=>{
    const newWatchlist = [...watchList,movieobj]
    localStorage.setItem('moviesApp',JSON.stringify(newWatchlist))//localstorage stor the elements in key value pairin these movieApp is key for newwatchlist value//stringfy covert the object into json string
    setwatchList(newWatchlist);
    console.log(newWatchlist);
    
  }

  const handleRemoveFromWatchList= (movieobj)=>{
    const filterwatch = watchList.filter(obj=>{
     return obj.id != movieobj.id 
    })
    setwatchList(filterwatch)
    localStorage.setItem('moviesApp' , JSON.stringify(filterwatch))
    console.log(filterwatch);
    
  }

  useEffect(()=>{
    let moviesFromLocalStorage = localStorage.getItem('moviesApp')
    if(!moviesFromLocalStorage){
      return
    }
    setwatchList(JSON.parse(moviesFromLocalStorage))//it will parse means it will retrive the data from localstorage and covert back into objects
  },[])

  return (
    <>
      <BrowserRouter>
        <Navbar changeMode={changeMode} mode={mode}/>

        <Routes>
          <Route path="/" element={<><Banner/><Movies apiKey={apiKey} handleAddtoWatchlist={handleAddtoWatchlist} handleRemoveFromWatchList={handleRemoveFromWatchList} watchList={watchList} mode={mode}/></>} />
          <Route path="/watchlist" element={<Watchlist watchList={watchList} handleRemoveFromWatchList={handleRemoveFromWatchList} mode={mode} setwatchList={setwatchList}/>} />
          <Route path="/movie/:id" element={<MovieDetails/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
