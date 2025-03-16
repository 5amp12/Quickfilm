import { useState } from "react";
import Header from '../components/Header/Header.js';
import SignUp from '../components/SignUp/SignUp.js';
import Styles from '../components/styles.css';


function SignUpView (){
    return(
        <div>
          <Header /> 
            <main>
                <SignUp />    
            </main>
        </div>
    );
}

export default SignUpView;
