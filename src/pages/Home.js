import React, { useEffect, useState } from 'react';
import Header from '../components/Header/Header.js';
import Styles from '../components/styles.css';
import PopularFilms from '../components/popularFilms/popularFilms.js';
//API KEY: eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NTY3N2NmYzE0Mzk2ODBmMzc1YTQwN2Q0ODU1ZjA3ZiIsIm5iZiI6MTczNjY4Mzg0OS4yNDUsInN1YiI6IjY3ODNiMTQ5YmQ3OTNjMDM1NDRlOTRiZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QbyteWIRgysb7ffZbt390rpbwAU_Zt3m4qYlPKV2sao

function Home() {
    return (
    <div>
     <Header /> 
      <main>
        <PopularFilms />
      </main>
    </div>
    
  );
}

export default Home;