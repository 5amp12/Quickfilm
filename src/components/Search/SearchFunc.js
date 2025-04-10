import React, { useEffect, useState } from 'react';
import Styles from './searchFunc.css';
import { useLocation } from 'react-router-dom';
import { fetchFilmSearch } from "../../services/api";


function SearchFunc() {
  const [error, setError] = useState(null); // State to track errors
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [movieList, setMovieList] = useState(null);
  const [data, setData] = useState(null);
  const location = useLocation()

  useEffect(() => {
    const fetchSearchQuery = async () => {
      try{
        const query = new URLSearchParams(location.search);
        setSearch(query.get("query"));
        const dataFound = await fetchFilmSearch(query.get("query"));
        if (!dataFound || !dataFound.results){
          setData(dataFound.length > 0 ? dataFound : []);
        }
        else{
          setData(dataFound)
        }
      }
      catch(error){
        setError(error.message);
      } 
      finally{
        setLoading(false)
      }
    };
    fetchSearchQuery();
  }, [location.search]);

  useEffect(() => {
    if (!data || !data || data.length === 0) return;
    const list = [];
    let i = 0;
    console.log("making sure this works", data)
    console.log("length", data.length-2)
    while (i < data.length-1){
      let movieTitle = (data[i].title);
      let movieId = data[i].id;
      let posterPath = data[i].poster_path;
      let posterImg = ('https://image.tmdb.org/t/p/original/'+ posterPath);
      list.push({ id: movieId, title: movieTitle, poster: posterImg });
      i++
      console.log(i)
    }
    setMovieList(list);

  }, [data]);

  if (loading || !movieList){
    return  <h3 className="display">Loading...</h3>
  }
  if (error){
    return <h3 className="display-msg">Error...</h3>
  }
  if (movieList.length === 0) {
    return <div className="display-msg">No movies found!</div>;
  }

  return (
    <div className="movie-list-search-container">
        <div className="movie-list-search">
            {movieList.map((movie) => ( 
                <div key={movie.id} className="movie-card-search">
                    <img src={movie.poster}/> 
                    <div className='card-title-container'><p>{movie.title}</p></div>
                </div>
            ))}
        </div>
    </div>
  )
}
export default SearchFunc;