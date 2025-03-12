import React, { useEffect, useState } from 'react';
import Header from '../components/Header/Header.js';
import SearchFunc from '../components/Search/SearchFunc.js';
import { useLocation } from 'react-router-dom';


function Search() {
  return (
    <div>
      <Header /> 
      <main>
        <SearchFunc />
      </main>
    </div>
  );
}

export default Search;