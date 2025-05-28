import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { signUpUser } from "../../services/authService";
import "./AuthForm.css";


function SignUp() {
    const [username, setUsername ] = useState ("");
    const [password, setPassword] = useState ("");
    const [confirmPassword, setConfirmPassword] = useState ("");
    const [message, setMessage] = useState ("");

    const handleSubmit = async (e) => {
        e.preventDefault();  //prevents page from reloading when the form is being submitted

        if (password.length < 8 || confirmPassword.length < 8){
            setMessage("Password is too short")
            // return;
        } 

        if (confirmPassword == password){

            const result = await signUpUser(username, password);

            if (result.error){
                setMessage(result.error);
            } else {
                setMessage("Registration Successful");
                localStorage.setItem('token', result.token);
                setPassword("");
                setUsername("");
                setConfirmPassword("");
                window.location.reload();   
            }
            // const token = localStorage.getItem('token');
            // const isLoggedIn = !!token;
            // alert(isLoggedIn);
        }
        else{
            setMessage("Passwords do not match")
        }
    };

    return(
        <div className="auth-form-container">
            
            <form className="auth-form" onSubmit={handleSubmit}>
                <h2>Sign Up</h2>
                <input 
                    placeholder="username..."
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required>
                </input>
                <input 
                    placeholder="password..." 
                    type="password"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required>
                </input>
                <input
                    placeholder="confirm password..." 
                    type="password"
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    required>
                </input>
                {message && <p className="error-message">{message}</p>}
                <button type="submit">Sign Up</button>
                <p id="signin-link">Have an account? <Link to="../signin">Sign in</Link></p>
            </form>
            
        </div>
    )
}
export default SignUp;