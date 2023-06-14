import React, {useState} from "react";
import '../style/Formstyle.css'
import axios from "axios";
import { BrowserRouter, Route, Link, Redirect, useNavigate, Navigate} from "react-router-dom";
import { Formik, Form, Field, ErrorMessage} from "formik";
import "../style/Popupstyle.css"
import * as Yup from 'yup'

export default function Login(){
    const navigate=useNavigate();
    const [error, setError]=useState(false);

     const initialValues={
        email: '',
        password: ''
    }
    const validationSchema=Yup.object({
        email: Yup.string()
            .required('Podaj adres e-mail.'),
        password: Yup.string()
            .required('Podaj hasło.')
    })

    function getCart(id){
        var request="http://localhost:8080/api/v1/auth/other/"+localStorage.getItem('id');
        axios.get(request)
        .then(response=>{
            localStorage.setItem('cart', response.data)
        })
    }

    const handleClick=(values)=>{
        const {email, password}=values;
        axios.post("http://localhost:8080/api/v1/auth/authenticate",{
            email: email,
            password: password
        }).then(response=>{
            localStorage.setItem('username', response.data.username)
            localStorage.setItem('role', response.data.role)
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('id', response.data.id)
            localStorage.setItem('logged', true)
            navigate("/")
        })
        .catch((error)=>{
            setError(true);
        })
    }

    const handleOkClick=()=>{
        setError(false);
    }

    return (
       <div className="form-div">
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values)=>{handleClick(values)}}>
                <Form className="form">
                    <h1 className="form-headline">Logowanie</h1>

                    <label className="form-label">E-mail</label>
                    <Field name="email" autoComplete="off"></Field>
                    <ErrorMessage name="email" component="div" className="error-style"></ErrorMessage>

                    <label className="form-label">Hasło</label>
                    <Field name="password" type="password" autoComplete="off"></Field>
                    <ErrorMessage name="password" component="div" className="error-style"></ErrorMessage>

                    <button type="submit" className="form-button">Zaloguj się</button>

                    <label className="standard-label">Nie masz konta?</label>
                    <Link to ="/register" className="link">Zarejestruj się</Link>
                </Form>
            </Formik>
            {
                error===true &&
                <div className="background">
                    <div className="warning-div">
                        <a className="warning-message">Nie można zalogować.</a>
                        <a className="warning-message">Podane dane są nieprawidłowe.</a>
                        <button onClick={handleOkClick} className="warning-ok-button">OK</button>
                    </div>
                </div>
            }
       </div>
    )
}