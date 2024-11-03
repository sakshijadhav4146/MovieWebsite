import React, { useEffect } from "react";
import { useState } from "react";
import genereIds from "../Utility/Genere"
import { Link } from "react-router-dom";

function Watchlist( {watchList, handleRemoveFromWatchList, mode, setwatchList}) {

  const [Search,setSearch]=useState('')
  const [genereList,setGenereList]=useState(["All Generes"])
  const [currentGenere,setcurrentGenere]=useState('All Generes')

  const handleSearch=(e)=>{
    setSearch(e.target.value)
  }

  ////sorting function of rating

  const sortInAscending=()=>{    /*If the function returns a negative value, movieA will be placed before movieB.  If it returns a positive value, movieA will be placed after movieB. If it returns 0, the order of movieA and movieB remains unchanged.*/ 
    const sortedAsc=watchList.sort((movieA,movieB)=>{
      return movieA.vote_average - movieB.vote_average
    })
    setwatchList([...sortedAsc])
  }

  const sortInDescending=()=>{
   const sortedDesc= watchList.sort((movieA,movieB)=>{
      return movieB.vote_average - movieA.vote_average
    })
    setwatchList([...sortedDesc])
  }
////sorting function for popularity
  const sortInAscPopularity=()=>{
    const sortedPopularityAsc=watchList.sort((movieA,movieB)=>{
      return movieA.popularity - movieB.popularity
    })
    setwatchList([...sortedPopularityAsc])
  }

  const sortInDescPopularity=()=>{
    const sortedPopularityDesc= watchList.sort((movieA,movieB)=>{
      return movieB.popularity - movieA.popularity
    })
    setwatchList([...sortedPopularityDesc])
  }

  ////maintaining state for filtering the watchlist as per genere 
  useEffect(()=>{
    let temp=watchList.map((movieobj)=>{
      return genereIds[movieobj.genre_ids[0]]
    })
    const unique=Array.from(new Set(temp)) ///for unique value
    setGenereList(['All Generes',...unique])
  },[watchList])


  //maintaining state for filtering genre onclick
  const handleFilter = (genere)=>{
    
      setcurrentGenere(genere)
    
  }

  return (
    <>
    {/* ----------Types of movie section------- */}

    <div className="flex justify-center flex-wrap  m-4 gap-4">
      {genereList.map((genere)=>{
      return <div key={genere} onClick={()=>handleFilter(genere)} className={currentGenere==genere?"flex justify-center items-center bg-green-700 text-white h-[3rem] w-[9rem] rounded-lg cursor-pointer":"flex justify-center items-center bg-slate-600 text-white h-[3rem] w-[9rem] rounded-lg"
      }>{genere}</div>
    })}
    </div>


    {/* --------table of watchlist display----- */}
    <div className="flex justify-center my-3">
       <input onChange={handleSearch} value={Search} className="p-1 text-black w-[20rem] bg-gray-100 outline-none" type="text" placeholder="Search Movies"/>
       </div> 
       <div className="overflow-hidden rounded-lg border border-gray-500 m-8">
        <table className="w-full text-gray-800 text-center">

          <thead className={`border-b-2 ${mode=='black'?"text-white" : "text-black"}`}>
             <tr>
              <th>Name</th>
              
              <th className="flex justify-center">
                <div onClick={sortInAscending} className="p-2 cursor-pointer"><i className="fa-solid fa-arrow-up-long"></i></div>
                 <div className="p-2">Rating</div>
                 <div onClick={sortInDescending} className="p-2 cursor-pointer"><i className="fa-solid fa-arrow-down-long"></i></div>
              </th>

              <th >
                <div className="flex items-center justify-center">
                <div onClick={sortInAscPopularity} className=" p-2 cursor-pointer"><i className="fa-solid fa-arrow-up-long"></i></div>
                <div>Popularity</div>
                <div onClick={sortInDescPopularity} className="p-2 cursor-pointer"><i className="fa-solid fa-arrow-down-long"></i></div>
                </div>
              </th>

              <th>Genre</th>
             </tr>
          </thead>

          <tbody className={`${mode=='black'?"text-white" : "text-black"}`}>

            {watchList.filter((movieobj)=>{
              if(currentGenere==='All Generes'){
                return true;
              }
              else{
                return genereIds[movieobj.genre_ids[0]]=== currentGenere;
              }
            }).filter((movieobj)=>{
              return movieobj.title.toLowerCase().includes(Search.toLowerCase())
            }).map((movieobj)=>{   ///here filter method has been add for serch functionality
              return  <tr key={movieobj.id} className="border-b-2">
              <td className="flex items-center px-6 py-4" >
               <img className="h-20 bg-contain" src={`http://image.tmdb.org/t/p/original/${movieobj.poster_path}`}/>
               {/* <div className="m-10">{movieobj.original_title}</div> */}
               <Link to={`/movie/${movieobj.id}`} className="m-10 text-blue-600 hover:underline">{movieobj.original_title}</Link>
              </td>
              <td>{movieobj.vote_average}</td>
              <td>{movieobj.popularity}</td>
              <td>{genereIds[movieobj.genre_ids[0]]}</td>
              <td onClick={()=>handleRemoveFromWatchList(movieobj)} className="text-red-800 cursor-pointer"><i className="fa-regular fa-trash-can"></i></td>
             </tr>
            })}
             
          </tbody>
        </table>
       </div>
   
    </>
  );
}

export default Watchlist;
