import React, {useState} from "react";
import '../style/Formstyle.css'
import '../style/Popupstyle.css'
import axios from "axios";
import { Formik, Form, Field, ErrorMessage} from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup'

export default function Register(){
    const [error, setError]=useState(false);
    const navigate=useNavigate();

   const initialValues = {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    }

    const validationSchema=Yup.object({
        username: Yup.string()
            .required('Podaj nazwe użytkownika.')
            .min(3, 'Nazwa użytkownika musi składać się z co najmniej 3 znaków.')
            .max(20, 'Nazwa użytkownika musi składać się z maksymalnie 20 znaków.'),
        email: Yup.string()
            .required('Podaj adres e-mail.')
            .email('Podany adres e-mail jest nieprawidłowy.'),
        password: Yup.string()
            .required('Podaj hasło.')
            .min(8, 'Hasło może składać się z co najmniej 8 znaków.')
            .max(20, 'Hasło nie może zawierać więcej niż 20 znaków.'),
        confirmPassword: Yup.string()
            .required('Powtórz hasło.')
            .oneOf([Yup.ref('password', '')], 'Podane hasła się różnią.')
    })

    const handleClick=(values)=>{
        const {username, email, password, confirmPassword}=values;
        console.log(values)
        axios.post("http://localhost:8080/api/v1/auth/register",{
                email: email,
                password: password,
                username: username
            }).then(response=>{
                navigate("/login")
            }).catch((error)=>{
                setError(true)
            });
    }

    const handleOkClick=()=>{
        setError(false);
    }

    return (
        <div className="form-div">
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values)=>{handleClick(values)}}>
                    <Form className="form">
                        <h1 className="form-headline">Rejestracja</h1>

                        <label className="form-label">Nazwa użytkownika</label>
                        <Field name="username" autoComplete="off"/>
                        <ErrorMessage name="username" component="div" className="error-style"/>

                        <label className="form-label">E-mail</label>
                        <Field name="email" autoComplete="off"/>
                        <ErrorMessage name="email" component="div" className="error-style"/>

                        <label className="form-label">Hasło</label>
                        <Field name="password" type="password" autoComplete="off"/>
                        <ErrorMessage name="password" component="div" className="error-style"/>
                        
                        <label className="form-label">Powtórz hasło</label>
                        <Field type="password" name="confirmPassword" autoComplete="off"/>
                        <ErrorMessage name="confirmPassword" component="div" className="error-style"/>

                        <button type="submit" className="form-button">Zarejestruj się</button>
                    </Form>
                </Formik>
                {error===true &&
                    <div className="background">
                        <div className="warning-div">
                            <a className="warning-message">Istnieje już konto przypisane do tego adresu e-mail.</a>
                            <button onClick={handleOkClick} className="warning-ok-button">OK</button>
                        </div>
                    </div>
                }
        </div>
    )
}