import React, { useEffect, useState } from 'react';

import Header from '../components/Header/Header.js';
import TvDetail from '../components/FilmDetail/TvDetail.js';

function TvDetailView() {
  return (
    <div>
      <Header /> 
      <main>
        <TvDetail />
      </main>
    </div>
  );
}

export default TvDetailView;