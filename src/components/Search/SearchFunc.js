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
        //console.log("look here", query.get("query"));
        const dataFound = await fetchFilmSearch(query.get("query"));
        if (!dataFound || !dataFound.results){
          console.log("hitting here");
          setData(dataFound.results.length > 0 ? dataFound.results : []);
        }
        else{
          setData(dataFound)
        }
        // console.log('here is teh data', dataFound)
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
    console.log("proper tester", data);
    if (!data || !data.results || data.results.length === 0) return;
    const list = [];
    let i = 0;
    while (i < 5){
      let movieTitle = (data.results[i].title);
      let movieId = data.results[i].id;
      let posterPath = data.results[i].poster_path;
      let posterImg = ('https://image.tmdb.org/t/p/original/'+ posterPath);
      console.log(movieTitle);
      console.log(movieId);
      console.log(posterImg)
      list.push({ id: movieId, title: movieTitle, poster: posterImg });
      i++
    }
    setMovieList(list);

  }, [data]);

  if (loading || !movieList){
    console.log("hitting1")
    console.log(movieList)
    return  <h3 className="display">Loading...</h3>
  }
  if (error){
    console.log("hitting2")
    return <h3 className="display-msg">Error...</h3>
  }
  if (movieList.length === 0) {
    console.log("hitting3");
    return <div className="display-msg">No movies found!</div>;
  }

  return (
    <div className="movie-list-container">
        <div className="movie-list">
            {movieList.map((movie) => ( 
                <div key={movie.id} className="movie-card">
                    <img src={movie.poster}/> 
                    <div className='card-title-container'><p>{movie.title}</p></div>
                </div>
            ))}
        </div>
    </div>
  )
}
export default SearchFunc;