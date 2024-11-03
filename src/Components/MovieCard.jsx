import React from "react";
import "../App.css";

function MovieCard({
  poster_path,
  original_title,
  handleAddtoWatchlist,
  items,
  handleRemoveFromWatchList,
  watchList,
}) {
  function toggleAddRem(items) {
    for (let i = 0; i < watchList.length; i++) {
      if (watchList[i].id === items.id) {
        return true;
      }
    }
    return false;
  }
  return (
    <>
      <div
        className="relative h-[40vh] w-[200px] bg-no-repeat bg-center bg-cover m-5 rounded-2xl hover:scale-105 duration-300 hover:cursor-pointer border-4 border-opacity-20 border-transparent  hover:border-yellow-950"
        style={{
          backgroundImage: `url(http://image.tmdb.org/t/p/original/${poster_path})`,
        }}
      >
        {toggleAddRem(items) ? (
          <div
            onClick={()=>handleRemoveFromWatchList(items)}
            className="flex justify-self-end m-2 rounded-lg bg-gray-900/60"
          >
            &#10060;
          </div>
        ) : (
          <div
            onClick={() => handleAddtoWatchlist(items)}
            className="flex justify-self-end m-2 rounded-lg bg-gray-900/60"
          >
            &#128151;
          </div>
        )}
        <div className=" absolute bottom-0 text-center text-white w-full p-2 bg-gray-900/60">
          {original_title}
        </div>
      </div>
    </>
  );
}

export default MovieCard;
