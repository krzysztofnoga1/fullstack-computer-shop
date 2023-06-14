import React from 'react';
import Login from '../components/Login';
import Navbar from '../components/Navbar';

function LoginPage(){
    return(
        <div className="App">
            <Navbar></Navbar>
            <Login></Login>
        </div>
    );
}

export default LoginPage;