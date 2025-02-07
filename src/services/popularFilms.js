import React, { useEffect, useState } from 'react';


function popularFilms() {
    
    const [error, setError] = useState(null); // State to track errors
    const [movieList, setMovieList] = useState(null);
    const [loading, setLoading] = useState(true);
    const [pageNum, setPageNum] = useState(1);
    
    useEffect(() => {
        const checkPopularFilms = async () => {
            setLoading(true);
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NTY3N2NmYzE0Mzk2ODBmMzc1YTQwN2Q0ODU1ZjA3ZiIsIm5iZiI6MTczNjY4Mzg0OS4yNDUsInN1YiI6IjY3ODNiMTQ5YmQ3OTNjMDM1NDRlOTRiZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QbyteWIRgysb7ffZbt390rpbwAU_Zt3m4qYlPKV2sao'
                }
            };
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/discover/movie?api_key=YOUR_API_KEY&language=en-US&sort_by=popularity.desc&vote_count.gte=1000&primary_release_date.gte=2023-01-01&page=1`
                    , options
                );
                if (!response.ok){
                    throw new Error("Failed to fetch Films");
                }
                const list = []
                const data = await response.json();
                console.log(data)
                let i = 0
                while (list.length < 10){
                    const isValidRuntime = await checkRuntime(data.results[i].id);
                    if (isValidRuntime){    
                        let movieTitle = (data.results[i].title);
                        let movieId = data.results[i].id;
                        let posterPath = data.results[i].poster_path;
                        let posterImg = ('https://image.tmdb.org/t/p/original/'+ posterPath);
                        console.log(movieTitle);
                        console.log(movieId);
                        list.push({ id: movieId, title: movieTitle, poster: posterImg });
                    }
                    i++
                }
                setMovieList(list);
            }
            catch (error){
                setError(error.message);
            }
            finally{
                setLoading(false);
            }
        }
        checkPopularFilms();
    }, []);
    const checkRuntime = async (id)=> {
        const options = {   
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NTY3N2NmYzE0Mzk2ODBmMzc1YTQwN2Q0ODU1ZjA3ZiIsIm5iZiI6MTczNjY4Mzg0OS4yNDUsInN1YiI6IjY3ODNiMTQ5YmQ3OTNjMDM1NDRlOTRiZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QbyteWIRgysb7ffZbt390rpbwAU_Zt3m4qYlPKV2sao'
            }
        };
        try{
            const baseUrl = 'https://api.themoviedb.org/3/movie/'
            var fullUrl = baseUrl + id + '?language=en-US'
            const response = await fetch(
                fullUrl, options
            )
            if (!response.ok){
                throw new Error("Failed to fetch movie ID")
            }
            const data = await response.json(); 
            return data.runtime < 400; 
        }
        catch{
            setError(error.message);
        }
        finally{
            setLoading(false)
        }
    }

    if (loading || !movieList) {
        return <div>Loading...</div>;
    }
    if (error){
        return <div>Error...</div>;
    }
    if (movieList.length === 0) {
        return <div>No movies found!</div>;
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