const IMG_BASE_URL = "https://image.tmdb.org/t/p/original/";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NTY3N2NmYzE0Mzk2ODBmMzc1YTQwN2Q0ODU1ZjA3ZiIsIm5iZiI6MTczNjY4Mzg0OS4yNDUsInN1YiI6IjY3ODNiMTQ5YmQ3OTNjMDM1NDRlOTRiZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QbyteWIRgysb7ffZbt390rpbwAU_Zt3m4qYlPKV2sao'
  },
};

//searching for films
export const fetchFilmSearch = async (query) => {
  try{
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?original_language=en&query=${encodeURIComponent(query)}`
      , options
    );
    if (!response.ok) {
      throw new Error("Failed to fetch Films")
    }

    const data = await response.json()
    const englishOnly = data.results.filter(movie => movie.original_language === 'en');
    console.log(englishOnly);
    // console.log('Is this hitting?');
    return data
  } catch (error) {
    console.error("Error fetching movies:", error);
    return { results: [] };
  }
};

// Fetch popular films
export const fetchPopularFilms = async () => {
  try {
    const response = await fetch(
        // `https://api.themoviedb.org/3/discover/movie?language=en-US&sort_by=popularity.desc&vote_count.gte=500&primary_release_date.gte=2024-06-01&page=1`
        'https://api.themoviedb.org/3/trending/movie/week'
        , options
    );
    if (!response.ok) {
      throw new Error("Failed to fetch Films");
    }

    const data =  await response.json();
    return data
  } catch (error) {
    console.error("Error fetching movies:", error);
    return { results: [] };
  }
};

// Check movie runtime
export const checkRuntime = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/movie/${id}?language=en-US`, options);
    if (!response.ok) {
      throw new Error("Failed to fetch movie ID");
    }
    const data = await response.json();
    return data.runtime < 400;
  } catch (error) {
    console.error("Error fetching runtime:", error);
    return false;
  }
};
