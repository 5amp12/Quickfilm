const API_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/api/auth"
    : "/api/auth";  //telling frontend where to send backend requests

//When ran in Vercel it is in "deploy mode" when run using node it is in "development" mode

// This sends files to the backend, and keeps the network/API logic separate from the React components, 
// making the app easier to manage and cleaner.


// Function to register a user
export const signUpUser = async (username,  password) => {
    try {
        const response = await fetch(`${API_URL}/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error registering user:", error);
        return { error: "Failed to register" };
    }
};

export const signInUser = async (username, password) => {
    try {
        const response = await fetch(`${API_URL}/signin`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error signing in user:", error);
        return { error: "Failed to sign in" };
    }
}

export const watchlist = async (movieId) => {
    const token = localStorage.getItem('token');
    try{
        const response = await fetch(`${API_URL}/watchlist`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ movieId }),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error adding to watchlist:", error);
        return { error: "Failed to add to watchlist" };
    }
}

export const remove_watchlist = async (movieId) => {
    const token = localStorage.getItem('token');
    try{
        const response = await fetch(`${API_URL}/remove_watchlist`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ movieId }),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error removing from watchlist:", error);
        return { error: "Failed to remove from watchlist" };
    }
}

export const checkWatchList = async () => {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`${API_URL}/checkWatchList`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
        return await response.json();
    } catch (error) {
        console.error("Error fetching watchlist:", error);  
        return { error: "Failed to fetch watchlist" };
    }
}
