import { useEffect, useState } from "react";
import { data, Link, useNavigate } from 'react-router-dom';
import { signInUser } from "../../services/authService";
import { toast } from "react-toastify";
import "./AuthForm.css";


function SignIn() {
    const [username, setUsername ] = useState ("");
    const [password, setPassword] = useState ("");
    const [message, setMessage] = useState ("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();  //prevents page from reloading when the form is being submitted

        const result = await signInUser(username, password);
        if (result.error){
            setMessage(result.error);
        } else {
            setMessage("Sign In Successful");
            localStorage.setItem('token', result.token);
            
            toast.success("success")
            navigate('/');

        }
        // const token = localStorage.getItem('token');
        // const isLoggedIn = !!token;
        // alert(isLoggedIn);
        
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
                {message && <p className="error-message">{message}</p>}
                <input 
                    placeholder="username..."
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    autoComplete="off"
                    required>
                </input>
                <input 
                    placeholder="password..." 
                    type="password"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    autoComplete="new-password"
                    required>
                </input>
                <button type="submit">Sign In</button>
                <p id="signin-link">Don't Have an account? <Link to="../signup">Sign up</Link> </p>
            </form>
            
        </div>
    )
}
export default SignIn;