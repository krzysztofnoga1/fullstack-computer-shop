import React, { useState } from "react";
import "../style/Tablestyle.css";
import axios from "axios";
import { useEffect } from "react";
import deleteImg from "../img/delete.png";
import editImg from "../img/edit.png";
import "../style/Popupstyle.css";
import "../style/Formstyle.css";
import "../style/Editbuttonsstyle.css";
import { Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from 'yup';

export default function ProcessorsTable(){

    const [data, setData]=useState([]);
    const [addData, setAddData]=useState(false);
    const [editData, setEditData]=useState(false);
    const [productId, setProductId]=useState();
    const [productName, setProductName]=useState();
    const [productPrice, setProductPrice]=useState();
    const [productQuantity, setProductQuantity]=useState();
    const [productSocket, setProductSocket]=useState();
    const [productTiming, setProductTiming]=useState();
    const [productCores, setProductCores]=useState();
    const [productMemory, setProductMemory]=useState();
    const [productThreads, setProductThreads]=useState();

    useEffect(()=>{
        getData()
    }, []);

    function getData(){
        axios.get("http://localhost:8080/api/v1/other/products-by-category/2")
        .then(response=>{
            setData(response.data);
        });
    }

    const intialValuesAdd={
        name: '',
        price: 0,
        quantity: 0,
        socket: '',
        timing: '',
        cores: 0,
        memory: 0,
        threads: 0
    }

    const intialValuesUpdate={
        newName: productName,
        newPrice: productPrice,
        newQuantity: productQuantity,
        newSocket: productSocket,
        newTiming: productTiming,
        newCores: productCores,
        newMemory: productMemory,
        newThreads: productThreads
    }

    const validationSchemaAdd=Yup.object({
        name: Yup.string()
            .required('Pole nie może być puste.'),
        price: Yup.number()
            .required('Pole nie może być puste.'),
        quantity: Yup.number()
            .required('Pole nie może być puste.'),    
        socket: Yup.string()
            .required('Pole nie może być puste.'),
        timing: Yup.string()
            .required('Pole nie może być puste.'),
        cores: Yup.number()
            .required('Pole nie może być puste.'),
        memory: Yup.number()
            .required('Pole nie może być puste.'),
        threads: Yup.number()
            .required('Pole nie może być puste.'),
    })

    const validationSchemaUpdate=Yup.object({
        newName: Yup.string()
            .required('Pole nie może być puste.'),
        newPrice: Yup.number()
            .required('Pole nie może być puste.'),
        newQuantity: Yup.number()
            .required('Pole nie może być puste.'),    
        newSocket: Yup.string()
            .required('Pole nie może być puste.'),
        newTiming: Yup.string()
            .required('Pole nie może być puste.'),
        newCores: Yup.number()
            .required('Pole nie może być puste.'),
        newMemory: Yup.number()
            .required('Pole nie może być puste.'),
        newThreads: Yup.number()
            .required('Pole nie może być puste.'),
    })

    const handleEditClick=(product)=>{
        setEditData(true);
        setProductId(product.id);
        setProductName(product.name);
        setProductPrice(product.price);
        setProductQuantity(product.quantity);
        setProductSocket(product.spec1);
        setProductTiming(product.spec2);
        setProductCores(product.spec3);
        setProductMemory(product.spec4);
        setProductThreads(product.spec5);
    }

    const handleAddClick=()=>{
        setAddData(true);
    }

    const handleCancelClick=()=>{
        setAddData(false);
    }

    const handleDeleteClick=(product)=>{
        var request="http://localhost:8080/api/v1/other/delete-product-by-id/"+product.id;
        axios.post(request).then(response=>{
            getData();
        })
    }

    const addNewProcessor=(values)=>{
        var name=values.name;
        var price=values.price;
        var quantity=values.quantity;
        var socket=values.socket;
        var timing=values.timing;
        var cores=values.cores;
        var memory=values.memory;
        var threads=values.threads;
        var request="http://localhost:8080/api/v1/other/add-new-product/2/"+name+"/"+price+"/"+
        quantity+"/"+socket+"/"+timing+"/"+cores+"/"+memory+"/"+threads;
        axios.post(request).then(response=>{
            getData();
        })
        setAddData(false);
    }

    const updateProcessor=(values)=>{
        var name=values.newName;
        var price=values.newPrice;
        var quantity=values.newQuantity;
        var socket=values.newSocket;
        var timing=values.newTiming;
        var cores=values.newCores;
        var memory=values.newMemory;
        var threads=values.newThreads;
        var request="http://localhost:8080/api/v1/other/update-product-by-id/"+productId+"/"+name+"/"+price+"/"+
        quantity+"/"+socket+"/"+timing+"/"+cores+"/"+memory+"/"+threads;
        console.log(request);
        axios.post(request).then(response=>{
            getData();
        })
        setEditData(false);
    }

    const cancelEdit=()=>{
        setEditData(false);
    }

    return(
        <div className="table-holder">
            <button className="add-button" onClick={handleAddClick}>DODAJ PRODUKT</button>
            <table className="table">
                <thead className="head">
                    <th>ID</th>
                    <th>Produkt</th>
                    <th>Cena</th>
                    <th>Ilość</th>
                    <th>Gniazdo</th>
                    <th>Taktowanie</th>
                    <th>Rdzenie</th>
                    <th>Pamięć podręczna(MB)</th>
                    <th>Wątki</th>
                    <th>Edytuj</th>
                    <th>Usuń</th>
                </thead>
                <tbody>
                {data.map((product, index)=>(
                        <tr key={index}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.quantity}</td>
                            <td>{product.spec1}</td>
                            <td>{product.spec2}</td>
                            <td>{product.spec3}</td>
                            <td>{product.spec4}</td>
                            <td>{product.spec5}</td>
                            <td>
                                <div className="edit" onClick={()=>handleEditClick(product)}>
                                    <img src={editImg} className="img"></img>
                                </div>
                            </td>
                            <td>
                                <div className="delete" onClick={()=>handleDeleteClick(product)}>
                                    <img src={deleteImg} className="img"></img>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {addData===true &&
                <div className="background">
                    <div className="form-div">
                        <Formik initialValues={intialValuesAdd} validationSchema={validationSchemaAdd} onSubmit={(values)=>{addNewProcessor(values)}}>
                            <Form className="form">
                                <h1 className="form-headline">Nowy produkt</h1>

                                <label className="form-label">Nazwa produktu</label>
                                <Field name="name" autoComplete="off"></Field>
                                <ErrorMessage name="name" className="error-style" component="div"></ErrorMessage>

                                <label className="form-label">Cena</label>
                                <Field name="price" autoComplete="off"></Field>
                                <ErrorMessage name="price" className="error-style" component="div"></ErrorMessage>

                                <label className="form-label">Ilość</label>
                                <Field name="quantity" autoComplete="off"></Field>
                                <ErrorMessage name="quantity" className="error-style" component="div"></ErrorMessage>

                                <label className="form-label">Gniazdo</label>
                                <Field name="socket" autoComplete="off"></Field>
                                <ErrorMessage name="socket" className="error-style" component="div"></ErrorMessage>

                                <label className="form-label">Taktowanie</label>
                                <Field name="timing" autoComplete="off"></Field>
                                <ErrorMessage name="timing" className="error-style" component="div"></ErrorMessage>

                                <label className="form-label">Rdzenie</label>
                                <Field name="cores" autoComplete="off"></Field>
                                <ErrorMessage name="cores" className="error-style" component="div"></ErrorMessage>

                                <label className="form-label">Pamięć podręczna(MB)</label>
                                <Field name="memory" autoComplete="off"></Field>
                                <ErrorMessage name="memory" className="error-style" component="div"></ErrorMessage>

                                <label className="form-label">Wątki</label>
                                <Field name="threads" autoComplete="off"></Field>
                                <ErrorMessage name="threads" className="error-style" component="div"></ErrorMessage>

                                <div className="edit-bottom-div">
                                    <button className="edit-button" type="submit">DODAJ</button>
                                    <button className="edit-button" onClick={handleCancelClick}>ANULUJ</button>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </div>
            }
            {editData===true &&
                <div className="background">
                    <div className="form-div">
                        <Formik initialValues={intialValuesUpdate} validationSchema={validationSchemaUpdate} onSubmit={(values)=>{updateProcessor(values)}}>
                            <Form className="form">
                                <h1 className="form-headline">Nowy produkt</h1>

                                <label className="form-label">Nazwa produktu</label>
                                <Field name="newName" autoComplete="off"></Field>
                                <ErrorMessage name="newName" className="error-style" component="div"></ErrorMessage>

                                <label className="form-label">Cena</label>
                                <Field name="newPrice" autoComplete="off"></Field>
                                <ErrorMessage name="newPrice" className="error-style" component="div"></ErrorMessage>

                                <label className="form-label">Ilość</label>
                                <Field name="newQuantity" autoComplete="off"></Field>
                                <ErrorMessage name="newQuantity" className="error-style" component="div"></ErrorMessage>

                                <label className="form-label">Układ</label>
                                <Field name="newSocket" autoComplete="off"></Field>
                                <ErrorMessage name="newSocket" className="error-style" component="div"></ErrorMessage>

                                <label className="form-label">Złącze</label>
                                <Field name="newTiming" autoComplete="off"></Field>
                                <ErrorMessage name="newTiming" className="error-style" component="div"></ErrorMessage>

                                <label className="form-label">Pamięć(GB)</label>
                                <Field name="newCores" autoComplete="off"></Field>
                                <ErrorMessage name="newCores" className="error-style" component="div"></ErrorMessage>

                                <label className="form-label">Rodzaj pamięci</label>
                                <Field name="newMemory" autoComplete="off"></Field>
                                <ErrorMessage name="newMemory" className="error-style" component="div"></ErrorMessage>

                                <label className="form-label">Wyjścia</label>
                                <Field name="newThreads" autoComplete="off"></Field>
                                <ErrorMessage name="newThreads" className="error-style" component="div"></ErrorMessage>

                                <div className="edit-bottom-div">
                                    <button className="edit-button" type="submit">EDYTUJ</button>
                                    <button className="edit-button" onClick={cancelEdit}>ANULUJ</button>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </div>
            }
        </div>
        
    )
}