import { useEffect, useState } from "react";
import { signUpUser } from "../../services/authService";


function SignUp() {
    const [username, setUsername ] = useState ("");
    const [password, setPassword] = useState ("");
    const [message, setMessage] = useState ("");

    const handleSubmit = async (e) => {
        e.preventDefault();  //prevents page from reloading when the form is being submitted

        const result = await signUpUser(username, password);

        if (result.error){
            setMessage(result.error);
        } else {
            setMessage("Registration Successful");
        }
    };

    return(
        <form onSubmit={handleSubmit}>
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
            
            <button type="submit">Submit</button>
            {message && <p>{message}</p>}
        </form>
    )
}
export default SignUp;