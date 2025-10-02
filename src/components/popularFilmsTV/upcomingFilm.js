    import { useEffect, useState, useRef } from "react";
    import { Link } from 'react-router-dom';
    import { fetchUpcoming } from "../../services/api";
    import LoadingScreen from "../LoadingScreen/LoadingScreen"
    import "./popularFilmsTV.css";
    //should have css call here

    function popularFilms(){
        const [error, setError] = useState(null); // State to track errors
        const [movieList, setMovieList] = useState(null);
        const [loading, setLoading] = useState(true);
        const movieListRef = useRef(null);

        useEffect(() => {
            const checkUpcomingFilms = async () => {
                setLoading(true);
                try{
                    const data = await fetchUpcoming();   //api call
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
            checkUpcomingFilms();

        }, []);
        if (loading || !movieList) {
            console.log("loading..")
            return <LoadingScreen />
            // return <div className="display-msg">Loading...</div>;
        }
        if (error){
            return <div className="display-msg">Error...</div>;
        }
        if (movieList.length === 0) {
            return <div className="display-msg">No movies found!</div>;
        }


        const scrollLeft = () => {
            if (movieListRef.current) {
            movieListRef.current.scrollBy({ left: -700, behavior: 'smooth' });
            }
        };

        const scrollRight = () => {
            if (movieListRef.current) {
            movieListRef.current.scrollBy({ left: 700, behavior: 'smooth' });
            }
        };

        return(
            <div className="popular-film-container">
                <p className="pop-films-header">Top upcoming films This week</p>
                <div className="movie-list-container">
                    <button className="scroll-button left" onClick={() => scrollLeft()}>
                    ◀
                    </button>

                    <div className="movie-list" ref={movieListRef}>
                        {movieList.map((movie) => ( 
                            <Link key={movie.id} to={`/film/${movie.id}`}>
                                <div key={movie.id} className="movie-card">
                                    <img src={movie.poster}/> 
                                    <div className='card-title-container'><p>{movie.title}</p></div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <button className="scroll-button right" onClick={() => scrollRight()}>
                    ▶
                    </button>
                </div>
            </div>
        )
    }
    export default popularFilms;