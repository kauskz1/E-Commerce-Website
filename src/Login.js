/* eslint-disable no-unused-vars */
import './stylesheets/Login.css';
import logo from './images/logo.png';
import {Link, useNavigate} from "react-router-dom";
import { useState } from 'react';
import {getAuth , signInWithEmailAndPassword, createUserWithEmailAndPassword} from 'firebase/auth';

export default function Login(){
    const navigate = useNavigate();
    const [email,setEmail] = useState("");
    const [pass,setPass] = useState("");

    const auth = getAuth();
    const signIn = e =>{
        e.preventDefault();
        
        signInWithEmailAndPassword(auth,email,pass)
        .then(auth=>{
            navigate('/');
        })
        .catch(error=>alert(error.message));
    }

    const register = e =>{
        e.preventDefault();

        createUserWithEmailAndPassword(auth,email,pass)
        .then((auth)=>{
            if(auth){
                navigate('/');
            }
        })
        .catch(error=>alert(error.message))
    }

    return(
    <>
    <div className="login">
        <img className="login-logo" src={logo} alt="login"/>
        <div className="login-container">
            <h1>Sign in</h1>

            <form>
                <label htmlFor="email">
                    <h5>E-mail:</h5>
                    <input className="login-input" id="email" type="text" value={email} onChange={e=>setEmail(e.target.value)}/>
                </label>

                <label htmlFor="pass">
                    <h5>Password:</h5>
                    <input className="login-input" id="pass" type="password" value={pass} onChange={e=>setPass(e.target.value)}/>
                </label>

                <button className="login-btn-signin" onClick={signIn}>Sign in</button>
            </form>

            <p>
            By signing in you agree to the React shop conditions of use & sale.
            </p>
        </div>
        <hr />
        <div className="login-divider">New User?<br/>
            <button className="login-btn-register" onClick={register}>Create your React account</button>
        </div>
    </div>
    </>
    );
}