import React from 'react';
import searchIcon from '../assets/search-icon2.png';

function Header() {
  return (
    <header>
      <h2>QuickFilm</h2>
      <div className="search-container">
        <input placeholder='Search...'></input>
        <img src={searchIcon}></img>
      </div>
      <button class="watchlist">Watchlist</button>
      <button class="sign-in">Sign In</button>
    </header>
  );  
}

export default Header;
