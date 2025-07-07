import { useState } from "react";
import Header from '../components/Header/Header.js';
import WatchList from '../components/WatchList/WatchList.js';
import Styles from '../components/styles.css';


function WatchListView (){
    return(
        <div>
          <Header /> 
            <main>
                <WatchList />    
            </main>
        </div>
    );
}

export default WatchListView;