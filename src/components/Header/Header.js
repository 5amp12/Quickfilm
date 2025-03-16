import React, { useState } from 'react';
import "./Header.css"
import searchIcon from '../../assets/search-icon2.png';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function Header() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();
   
  const searchSubmit = (event) => {
    event.preventDefault();
    console.log(input);
    navigate(`/search?query=${encodeURIComponent(input)}`);
    setInput("");
  };

  return (
    <header>
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
      <button class="watchlist">Watchlist</button>
        <Link to="/signup">
          <button class="sign-in">Sign Up</button>
        </Link>
    </header>
  );  
}

export default Header;
