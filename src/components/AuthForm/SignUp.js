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

        if (confirmPassword == password){

            const result = await signUpUser(username, password);

            if (result.error){
                setMessage(result.error);
            } else {
                setMessage("Registration Successful");
                setPassword("");
                setUsername("");
                setConfirmPassword("");
            }
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
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required>
                </input>
                <input
                    placeholder="confirm password..." 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    required>
                </input>
                <button type="submit">Sign Up</button>
                <p>Have an account? <Link to="../signin">Sign in</Link></p>
            </form>
            {message && <p className="error-message">{message}</p>}
        </div>
    )
}
export default SignUp;