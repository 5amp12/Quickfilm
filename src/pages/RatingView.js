import { useState } from "react";
import Header from '../components/Header/Header.js';
import Rating from '../components/Rating/Rating.js';
import Styles from '../components/styles.css';


function RatingView (){
    return(
        <div>
          <Header /> 
            <main>
                <Rating />    
            </main>
        </div>
    );
}

export default RatingView;