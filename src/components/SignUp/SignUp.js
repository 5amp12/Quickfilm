import { useEffect, useState } from "react";
import { signUpUser } from "../../services/authService";
import "./SignUp.css";


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
            }
        }
        else{
            setMessage("Passwords do not match")
        }
    };

    return(
        <form className="signup-form" onSubmit={handleSubmit}>
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
            <button type="submit">Submit</button>
            {message && <p className="error-message">{message}</p>}
        </form>
    )
}
export default SignUp;