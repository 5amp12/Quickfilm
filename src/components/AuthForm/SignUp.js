import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { signUpUser } from "../../services/authService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AuthForm.css";


function SignUp() {
    const [username, setUsername ] = useState ("");
    const [password, setPassword] = useState ("");
    const [confirmPassword, setConfirmPassword] = useState ("");
    const [message, setMessage] = useState ("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();  //prevents page from reloading when the form is being submitted

        if (password.length > 8){
            if (confirmPassword == password){
                console.log("getting here somehow???")
                const result = await signUpUser(username, password);
                if (result.error){
                    setMessage(result.error);
                } else {
                    setMessage("Registration Successful");
                    localStorage.setItem('token', result.token);
                    
                    toast.success("success")
                    navigate('/');

                    
                    // setPassword("");
                    // setUsername("");
                    // setConfirmPassword("");
                    // window.location.reload();   
                }
            }
            else{
                setMessage("Passwords do not match");
            }
        } else {
            setMessage("Password is too short");
        }
    };

    return(
        <div className="auth-form-container">
            
            <form className="auth-form" onSubmit={handleSubmit}>
                <h2>Sign Up</h2>
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
                <input
                    placeholder="confirm password..." 
                    type="password"
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    autoComplete="new-password"
                    required>
                </input>
                <button type="submit">Sign Up</button>
                <p id="signin-link">Have an account? <Link to="../signin">Sign in</Link></p>
            </form>
            
        </div>
    )
}
export default SignUp;