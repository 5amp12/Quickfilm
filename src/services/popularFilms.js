import React, { useEffect, useState } from 'react';

function popularFilms() {
    const [data, setData] = useState(null); // State to store API data
    const [loading, setLoading] = useState(true); // State to track loading state
    const [error, setError] = useState(null); // State to track errors
    const [title, setTitle] = useState(null)

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NTY3N2NmYzE0Mzk2ODBmMzc1YTQwN2Q0ODU1ZjA3ZiIsIm5iZiI6MTczNjY4Mzg0OS4yNDUsInN1YiI6IjY3ODNiMTQ5YmQ3OTNjMDM1NDRlOTRiZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QbyteWIRgysb7ffZbt390rpbwAU_Zt3m4qYlPKV2sao'
            }
        };
        fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            
            return response.json();
        })
        .then((data) => {
            setData(data)
            setLoading(false)
            setTitle(data.results[0].original_title)
            console.log('hello')
        })
        .catch((error) => {
            setError(error.message)
            setLoading(false)
        })
    }, [])

    return(
        <div>
            <p>{title}</p>
        </div>
    )
}
export default popularFilms;