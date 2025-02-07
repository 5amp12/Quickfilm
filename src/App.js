import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Styles from './components/styles.css';
import PopularFilms from './services/popularFilms.js';
//API KEY: eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NTY3N2NmYzE0Mzk2ODBmMzc1YTQwN2Q0ODU1ZjA3ZiIsIm5iZiI6MTczNjY4Mzg0OS4yNDUsInN1YiI6IjY3ODNiMTQ5YmQ3OTNjMDM1NDRlOTRiZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QbyteWIRgysb7ffZbt390rpbwAU_Zt3m4qYlPKV2sao



function App() {
    return (
    <div>
     <Header /> 
      <main>
        <p className="pop-films-header">Popular Films</p>
        <PopularFilms />
      </main>
    </div>
    
  );
}

export default App;

