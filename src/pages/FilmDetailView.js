import React, { useEffect, useState } from 'react';

import Header from '../components/Header/Header.js';
import Styles from '../components/styles.css';
import FilmDetail from '../components/FilmDetail/FilmDetail.js';

function FilmDetailView() {
  return (
    <div>
      <Header /> 
      <main>
        <FilmDetail />
      </main>
    </div>
  );
}

export default FilmDetailView;