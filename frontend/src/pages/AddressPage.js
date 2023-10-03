import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import "../style/Formstyle.css"
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup'
import { useNavigate } from "react-router-dom";

export default function AddressPage(){

    const [clientId, setClientId]=useState(localStorage.getItem('id'));
    const navigate=useNavigate();

    const initialValues={
        name: '',
        surname: '',
        city: '',
        street: '',
        code: '',
    }

    const validationSchema=Yup.object({
        name: Yup.string()
            .required('To pole jest wymagane.'),
        surname: Yup.string()
            .required('To pole jest wymagane.'),
        city: Yup.string()
            .required('To pole jest wymagane.'),
        street: Yup.string()
            .required('To pole jest wymagane.'),
        code: Yup.string()
            .required('To pole jest wymagane.')
    })

    const handleClick=(values)=>{
        const {name, surname, city, street, code}=values;
        var request="http://localhost:8080/api/v1/other/add-order/"+clientId+"/"+name+"/"+surname+"/"+city+"/"+street+"/"+code;
        console.log(request);
        axios.post(request)
        .then(response=>{
            localStorage.setItem('order', response.data);
            navigate("/ordersuccessful");
        })
    }

    return(
        <div className="App">
            <Navbar></Navbar>
            <div className="form-div">
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values)=>{handleClick(values)}}>
                    <Form className="form">
                        <h1 className="form-headline">Adres wysyłki</h1>
                        <label className="form-label">Imię</label>
                        <Field name="name" autoComplete="off"></Field>
                        <ErrorMessage name="name" className="error-style" component="div"></ErrorMessage>

                        <label className="form-label">Nazwisko</label>
                        <Field name="surname" autoComplete="off"></Field>
                        <ErrorMessage name="surname" className="error-style" component="div"></ErrorMessage>

                        <label className="form-label">Miejscowość</label>
                        <Field name="city" autoComplete="off"></Field>
                        <ErrorMessage name="city" className="error-style" component="div"></ErrorMessage>

                        <label className="form-label">Ulica</label>
                        <Field name="street" autoComplete="off"></Field>
                        <ErrorMessage name="street" className="error-style" component="div"></ErrorMessage>

                        <label className="form-label">Kod pocztowy</label>
                        <Field name="code" autoComplete="off"></Field>
                        <ErrorMessage name="code" className="error-style" component="div"></ErrorMessage>

                        <button type="submit" className="form-button">POTWIERDŹ</button>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}