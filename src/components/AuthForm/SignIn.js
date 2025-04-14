import { useEffect, useState } from "react";
import { data, Link } from 'react-router-dom';
import { signInUser } from "../../services/authService";
import "./AuthForm.css";


function SignIn() {
    const [username, setUsername ] = useState ("");
    const [password, setPassword] = useState ("");
    const [message, setMessage] = useState ("");

    const handleSubmit = async (e) => {
        e.preventDefault();  //prevents page from reloading when the form is being submitted

        const result = await signInUser(username, password);
        if (result.error){
            setMessage(result.error);
        } else {
            setMessage("Sign In Successful");
            localStorage.setItem('token', result.token);
        }
        const token = localStorage.getItem('token');
        const isLoggedIn = !!token;
        alert(isLoggedIn);
        
        //To grab the current user id signed into the session do: 
        // import jwt_decode from 'jwt-decode';

        // const token = localStorage.getItem('token');

        // if (token) {
        //     const decoded = jwt_decode(token);
        //     const userId = decoded.userId;
        //     console.log('User ID:', userId);

        
    };

    return(
        <div className="auth-form-container">
            
            <form className="auth-form" onSubmit={handleSubmit}>
                <h2>Sign In</h2>
                <input 
                    placeholder="username..."
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required>
                </input>
                <input 
                    placeholder="password..." 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required>
                </input>
                <button type="submit">Sign In</button>
                <p>Don't Have an account? <Link to="../signup">Sign up</Link> </p>
            </form>
            {message && <p className="error-message">{message}</p>}
        </div>
    )
}
export default SignIn;