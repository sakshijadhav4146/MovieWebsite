import React from "react";
import Movie from "../Movie.png";
import { Link } from "react-router-dom";
function Navbar({ changeMode, mode }) {
  return (
    <>
      <div
        className={`flex justify-between border items-center pl-3 py-4 cursor-pointer border-none  ${
          mode === "black" ? "#0c1512" : "bg-slate-200"
        }`}
      >
        <div className="flex items-center space-x-8">
        <img className="w-[50px]" src={Movie} alt="" />
        <Link
          to="/"
          className={`text-slate-900 font-bold text-lg  hover:text-blue-900 hover:shadow-none ${
            mode == "black" ? "text-white" : "text-slate-900"
          }`}
        >
          Movies
        </Link>
        <Link
          to="/watchlist"
          className={`text-slate-900 font-bold text-lg  hover:text-blue-900 hover:shadow-none ${
            mode == "black" ? "text-white" : "text-slate-900"
          }`}
        >
          WatchList
        </Link>
        </div>
        <div className="flex-grow"></div>
         
        <button className="text-lg font-bold mr-6" onClick={changeMode} type="button">
        {mode == "black"?<i className="fa-solid fa-sun"></i>:<i className="fa-solid fa-moon"></i>}
        </button>
        
        
      </div>
    </>
  );
}

export default Navbar;
