import React, { useEffect, useState } from 'react';
import "./Header.css"
import searchIcon from '../../assets/search-icon2.png';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';


function Header() {
  const [input, setInput] = useState("");
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [menuOpen, setMenuOpen] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
   
  const searchSubmit = (event) => {
    event.preventDefault();
    console.log(input);
    navigate(`/search?query=${encodeURIComponent(input)}`);
    setInput("");
  };

  const toggleDropdown = () => {
    setMenuOpen(!menuOpen);
  }

  const signOut = () => {
    console.log("sign Out hitting")
    localStorage.removeItem('token');
    window.location.reload()
  }

  const watchlist = () => {
    navigate('/watchlist');
  }

  const info = () => {
    console.log()
  }
  // setToken(localStorage.getItem('token'));  
  useEffect(() => {   //dealing with User change (logging in)
    const UserChange = () => {        
      setToken(localStorage.getItem('token') || '');  
    };
    
    UserChange();
    
    window.addEventListener('storage', UserChange);    //keeps everything up to date, with what user is signed in

    return () => {    //clean up function
      window.removeEventListener('storage', UserChange);
    };

  }, []);

  useEffect(() => {
    if (token){
      try{
        const decoded = jwtDecode(token);
        setUsername(decoded.username);
      } catch (err) {
        console.error("Invalid token", err);
        setUsername("")
      }
    }
    else{
      console.log("No token")
    }
    console.log(username)
  }, [token])


  return (
    <header>
      <div className='header-content-container'>
        <Link to="/" class="home-link">
          <h2>QuickFilm</h2>
        </Link>
        <form onSubmit={searchSubmit} className="search-container">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Search...'>
          </input>
          <img type="submit" src={searchIcon}></img>
        </form>
        <button className="watchlist" onClick={watchlist}>Watchlist</button>
        { token ? (
          <>
            <div className='dropdown'>
              <button onClick={toggleDropdown}className="user-Account-button">U</button>
              {menuOpen && (
                <div className='dropdown-menu'>
                  <span className="dropdown-account"href='#'>{username}</span>
                  <a onClick={info}>Account Info</a>
                  <a onClick={signOut}>Logout</a>
                </div>
              )}
            </div>
          </>
        ) : (
          <Link to="/signup">
            <button className="sign-in">Sign Up</button>
          </Link>
        )}
      </div>
    </header>
  );  
}

export default Header;
