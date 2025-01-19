import React, { useEffect, useState } from 'react';
import PopularFilms from './popularFilms.js';


console.log("loading")
function runtime() {
    const [data, setData] = useState(null);
    const [length, setLength] = useState(null);

    console.log("Runtime.js is loaded!");
    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NTY3N2NmYzE0Mzk2ODBmMzc1YTQwN2Q0ODU1ZjA3ZiIsIm5iZiI6MTczNjY4Mzg0OS4yNDUsInN1YiI6IjY3ODNiMTQ5YmQ3OTNjMDM1NDRlOTRiZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QbyteWIRgysb7ffZbt390rpbwAU_Zt3m4qYlPKV2sao'
            }
        };
        const baseUrl = 'https://api.themoviedb.org/3/movie/'
        const id = localStorage.getItem("selectedMovieId")
        var fullUrl = baseUrl + id + '?language=en-US'
        fetch(fullUrl, options)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch data"); 
            }
            return response.json();
        })
        .then((data) => {
            console.log(data)
            console.log("hitting")
            setLength(data.runtime)
        })
        .catch((error) => {
            setError(error.message)
            setLoading(false)
        })
    }, [])
    return(
        <div>
            <p>{length}</p>
        </div> 
    )
}
export default runtime;