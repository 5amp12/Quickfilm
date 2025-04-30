import { useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import { fetchFilmId } from "../../services/api";
import 'typeface-playfair-display';             //font
import "./FilmDetail.css";

function FilmDetail() {
    const { id } = useParams();
    // const [filmDescription, setfilmDescription] = useState("");
    const [movieData, setMovieData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    // console.log("hello")
    useEffect(() => {
        const filmData = async () => {
            try{
                const data = await fetchFilmId(id);
                console.log(data);
                console.log('https://image.tmdb.org/t/p/original/' + data.backdrop_path)

                const movie = {
                    title: data.title,
                    description: data.overview,
                    rating: data.vote_average,
                    // genre
                    // cast
                    tagline: data.tagline,
                    runtime: data.runtime,
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
            <div className='main-movie-info'>
                <img src={movieData.poster} alt={movieData.title + " poster"} id='poster'/>
                <div className='movie-text-container'>
                    <div className='title-runtime-container'> 
                        <h3 id='title'>{movieData.title}</h3>
                        <h3 id='runtime'>{movieData.runtime} mins</h3>
                    </div>
                    <p id='description'>{movieData.description}</p>
                </div>
            </div>
            
        </div>
    );
}
export default FilmDetail;