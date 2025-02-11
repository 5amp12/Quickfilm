import React from 'react';
import "./Header.css"
import searchIcon from '../../assets/search-icon2.png';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <h2>QuickFilm</h2>
      <div className="search-container">
        <input placeholder='Search...'></input>
        <img src={searchIcon}></img>
      </div>
      <button class="watchlist">Watchlist</button>
      <Link to="/signin">
        <button class="sign-in">Sign In</button>
      </Link>
    </header>
  );  
}

export default Header;
