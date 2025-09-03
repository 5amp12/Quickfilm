import { useEffect, useState, useRef } from "react";
import { Link } from 'react-router-dom';
import { checkWatchList } from "../../services/authService";
import { fetchFilmId } from "../../services/api"
import "./WatchList.css";

function WatchList() {
    const [error, setError] = useState(null);
    const [movieList, setMovieList] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const scanWatchList = async () => {
            try{
                const filmsID = await checkWatchList();
                console.log(filmsID);
                const list = []
                for (let film of filmsID.watchlist){
                    
                    const data = await fetchFilmId(film);
                    console.log(data);

                    
                    let movieTitle = (data.title);
                    let movieId = data.id;
                    let posterPath = data.poster_path;
                    let posterImg = ('https://image.tmdb.org/t/p/original/'+ posterPath);

                    list.push({ id: movieId, title: movieTitle, poster: posterImg });

                }
                setMovieList(list);

            } catch (error){
                console.error(error);
            }
            finally{
                setLoading(false)
            }

        }
        scanWatchList();
    }, [])

    if (loading || !movieList){
        return  <h3 className="display">Loading...</h3>
    }
    if (error){
        return <h3 className="display-msg">Error...</h3>
    }
    if (movieList.length === 0) {
        return <div className="display-msg">No movies found!</div>;
    }

    return(
        <div className="movie-list-search-container">
            <div className="movie-list-search">
                {movieList.map((movie) => ( 
                <Link key={movie.id} to={`/film/${movie.id}`}>
                    <div key={movie.id} className="movie-card-search">
                        <img src={movie.poster}/> 
                        <div className='card-title-container'><p>{movie.title}</p></div>
                    </div>
                </Link>
                ))}
            </div>
        </div>
    )
    
}
export default WatchList;