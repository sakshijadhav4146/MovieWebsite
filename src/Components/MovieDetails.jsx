import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const apiKey = import.meta.env.REACT_APP_MOVIE_API;

  useEffect(() => {
    const fetchDetails = async () => {
      //api for movie info////
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
      );
      setMovie(response.data);

      //api for trailer from youtube///
      const videoResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}&language=en-US`
      );
      const trailers = videoResponse.data.results;

      const trailer = trailers.find((video) => video.type === "Trailer");
      setTrailer(trailer);
    };
    fetchDetails();
  }, [id, apiKey]);

  
  ///loading//////
  if (!movie) {
    return <p>Loading...</p>;
  }

  ////Rating function//////
  const filterRating = (rating) => {
    const maxRating = 5;
    const filterRate = Math.round(rating / 2);
    let stars = [];
    for (let i = 0; i < maxRating; i++) {
      if(i<filterRate){
        stars.push(<i key={i} className="fa-solid fa-star text-yellow-400 "></i>);
      }
      else{
        stars.push(<i key={i} className="fa-regular fa-star text-yellow-400"></i>)
      }
    }
    return stars;
  };


  return (
    <>

      <div className="flex flex- gap-5 bg-blue-400 bg-opacity-20 m-3 ">
        <img
          src={`http://image.tmdb.org/t/p/original/${movie.poster_path}`}
          className="h-96 w-96  "
        />
        <div className="text-wrap m-10 ">
        <h1 className="text-3xl mb-5 text-center font-bold ">{movie.original_title}</h1>
          <p className="text-xl mb-4 font-serif">{movie.overview}</p>
          <p className="mb-2 text-green-800 ">Release Date : {movie.release_date}</p>
          <p className="mb-2 text-green-800">Popularity : {movie.popularity}</p>
          <p className="mb-2 text-green-800">Rating : {filterRating(movie.vote_average)}</p>
        </div>
      </div>

      {trailer ? (
        <div className="m-3">
          <h2 className="text-center text-3xl font-bold m-5"> Watch the Trailer</h2>
          <iframe
          className="w-full h-[30rem] "
            
            src={`https://www.youtube.com/embed/${trailer.key}`}
            title="Trailer"
            allowFullScreen
          />
        </div>
      ) : (
        <p>No trailer available</p>
      )}
    </>
  );
}

export default MovieDetails;
