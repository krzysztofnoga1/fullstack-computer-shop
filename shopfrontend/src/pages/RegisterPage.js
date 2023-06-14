import React from "react";
import Navbar from "../components/Navbar";
import Register from "../components/Register";

function RegisterPage(){
    return (
        <div className="App">
            <Navbar></Navbar>
            <Register></Register>
        </div>
    );
}

export default RegisterPage;