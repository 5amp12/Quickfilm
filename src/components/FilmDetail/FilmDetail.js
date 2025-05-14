import { useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import { fetchFilmId } from "../../services/api";
import starIcon from '../../assets/icons8-star-48.png';
import 'typeface-playfair-display';             //font
import "./FilmDetail.css";

function FilmDetail() {
    const { id } = useParams();
    // const [filmDescription, setfilmDescription] = useState("");
    const [movieData, setMovieData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    
    useEffect(() => {
        const filmData = async () => {
            try{
                const data = await fetchFilmId(id);
                console.log(data);
                console.log('https://image.tmdb.org/t/p/original/' + data.backdrop_path)
                const shortDate = data.release_date.slice(0, 4);   //getting the year made
                const movie = {
                    title: data.title,
                    description: data.overview,
                    rating: data.vote_average.toFixed(1),  
                    // genre
                    // cast
                    tagline: data.tagline,
                    runtime: data.runtime,
                    budget: data.budget,
                    date: shortDate,
                    
                    // let backdrop_data = data.backdrop_path;
                    backdrop: 'https://image.tmdb.org/t/p/original/' + data.backdrop_path,
                    poster: 'https://image.tmdb.org/t/p/original/' + data.poster_path
                    
                };
                setMovieData(movie);
            }
            catch (error){
                setError(error.message);
            }
            finally{
                setLoading(false);
            }
            
    
        };
        filmData();
    }, []);
    if (loading || !movieData) {
        return <div className="display-msg">Loading...</div>;
    }
    if (error){
        return <div className="display-msg">Error...</div>;
    }
    return (
        <div className='movieContainer'>
            <img src={movieData.backdrop} alt={movieData.title + " backdrop"} id='backdrop'/>
            <div className='movie-contents'>
                <div className='info-container'>
                    <h1 id='title-date'>{movieData.title} - {movieData.date}</h1>
                    <h3 id='tagline'>{movieData.tagline}</h3>
                    <p id='description'>{movieData.description}</p>
                    <div className='list-container'>
                        <div className='genre-list'>
                            <span className='genre-box'>Genre1</span>   
                            <span className='genre-box'>Genre2</span>
                            <span className='genre-box'>Genre3</span>
                        </div>
                        <div className='add-film-list'>
                            <button>Add to WatchList</button>
                            <button>Rate this Film</button> 
                        </div>
                    </div>

                </div>
                <div className='poster-extra-content'>
                    <div className='rating-runtime-container'>
                        <div className='star-rating'>
                            <img src={starIcon} alt='star' id='star-icon'></img>
                            <h3 id='rating'>{movieData.rating}</h3>
                        </div>
                        <h3 id='runtime'>{movieData.runtime} mins</h3>
                    </div>
                    <div className='poster-quiz-container'>
                        <div>
                            <img src={movieData.poster} alt={movieData.title + " poster"} id='poster'/>
                        </div>
                        <div className='budget-quiz-container'>
                            <span className='budget-quiz'>${movieData.budget}</span>
                            <span className='budget-quiz'>${movieData.budget + 10000}</span>
                            <span className='budget-quiz'>${movieData.budget - 10000}</span>
                        </div> 
                        
                    </div>
                </div>
            </div>
        </div>    
    );
}
export default FilmDetail;