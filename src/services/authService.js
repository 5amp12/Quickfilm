const API_URL = "http://localhost:5000/api/auth";    //telling frontend where to send backend requests

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