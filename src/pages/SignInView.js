import { useState } from "react";
import Header from '../components/Header/Header.js';
import SignIn from '../components/AuthForm/SignIn.js';
import Styles from '../components/styles.css';


function SignInView (){
    return(
        <div>
          <Header /> 
            <main>
                <SignIn />    
            </main>
        </div>
    );
}

export default SignInView;