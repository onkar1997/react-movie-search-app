import React from "react";
import { NavLink } from "react-router-dom";
import { useGlobalContext } from "./context";
import './App.css'


const Movie = () => {
  const { movie, loading } = useGlobalContext();

  if (loading) {
    return (
      <div>
        <div className="loading">
          Loading...
        </div>
      </div>
    )
  }

  return (
    <>
      {/* if movie is present then only show data else remain as it is  */}
      <section className="movie-page">
        <div className="container grid grid-4-col">
          {movie
            ? movie.map((curMovieElem) => {
                const { imdbID, Title, Poster } = curMovieElem;
                const movieName = Title.substring(0, 15);

                return (
                  <NavLink to={`movie/${imdbID}`} key={imdbID}>
                    <div className="card">
                      <div className="card-info">
                        <h2>
                          {movieName.length >= 13
                            ? `${movieName}...`
                            : movieName}
                        </h2>
                        <img src={Poster} alt={imdbID} />
                      </div>
                    </div>
                  </NavLink>
                );
              })
            : ""}
        </div>
      </section>
    </>
  );
};

export default Movie;