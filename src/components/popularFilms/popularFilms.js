import { useEffect, useState } from "react";
import { fetchPopularFilms } from "../../services/api";
//should have css call here

function popularFilms(){
    const [error, setError] = useState(null); // State to track errors
    const [movieList, setMovieList] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkPopularFilms = async () => {
            setLoading(true);
            try{
                const data = await fetchPopularFilms();   //api call
                const list = []
                console.log(data)
                let i = 0
                while (list.length < 10 && i < data.results.length){
                    let movieTitle = (data.results[i].title);
                    let movieId = data.results[i].id;
                    let posterPath = data.results[i].poster_path;
                    let posterImg = ('https://image.tmdb.org/t/p/original/'+ posterPath);
                    console.log(movieTitle);
                    console.log(movieId);
                    list.push({ id: movieId, title: movieTitle, poster: posterImg });

                    i++;
                }
                setMovieList(list);
            }
            catch (error){
                setError(error.message);
            }
            finally{
                setLoading(false);
            }
        };
        checkPopularFilms();

    }, []);
    if (loading || !movieList) {
        return <div className="display-msg">Loading...</div>;
    }
    if (error){
        return <div className="display-msg">Error...</div>;
    }
    if (movieList.length === 0) {
        return <div className="display-msg">No movies found!</div>;
    }

    return(
        <div className="movie-list">
            {movieList.map((movie) => ( 
                <div key={movie.id} className="movie-card">
                    <img src={movie.poster}/> 
                    <p>{movie.title}</p>
                </div>
            ))}
        </div>
    )
}
export default popularFilms;