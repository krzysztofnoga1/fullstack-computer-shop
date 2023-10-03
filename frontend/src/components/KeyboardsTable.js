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

export default function KeyboardsTable(){

    const [data, setData]=useState([]);
    const [addData, setAddData]=useState(false);
    const [editData, setEditData]=useState(false);
    const [productId, setProductId]=useState();
    const [productName, setProductName]=useState();
    const [productPrice, setProductPrice]=useState();
    const [productQuantity, setProductQuantity]=useState();
    const [productConnection, setProductConnection]=useState();
    const [productInterface, setProductInterface]=useState();
    const [productSystem, setProductSystem]=useState();
    const [productPurpose, setProductPurpose]=useState();
    const [productSwitch, setProductSwitch]=useState();

    useEffect(()=>{
        getData()
    }, []);

    function getData(){
        axios.get("http://localhost:8080/api/v1/other/products-by-category/6")
        .then(response=>{
            setData(response.data);
        });
    }

    const intialValuesAdd={
        name: '',
        price: 0,
        quantity: 0,
        connection:'' ,
        interface: '',
        system: '',
        purpose: '',
        switch: ''
    }

    const intialValuesUpdate={
        newName: productName,
        newPrice: productPrice,
        newQuantity: productQuantity,
        newConnection: productConnection,
        newInterface: productInterface,
        newSystem: productSystem,
        newPurpose: productPurpose,
        newSwitch: productSwitch
    }

    const validationSchemaAdd=Yup.object({
        name: Yup.string()
            .required('Pole nie może być puste.'),
        price: Yup.number()
            .required('Pole nie może być puste.'),
        quantity: Yup.number()
            .required('Pole nie może być puste.'),    
        connection: Yup.string()
            .required('Pole nie może być puste.'),
        interface: Yup.string()
            .required('Pole nie może być puste.'),
        system: Yup.string()
            .required('Pole nie może być puste.'),
        purpose: Yup.string()
            .required('Pole nie może być puste.'),
        switch: Yup.string()
            .required('Pole nie może być puste.'),
    })

    const validationSchemaUpdate=Yup.object({
        newName: Yup.string()
            .required('Pole nie może być puste.'),
        newPrice: Yup.number()
            .required('Pole nie może być puste.'),
        newQuantity: Yup.number()
            .required('Pole nie może być puste.'),    
        newConnection: Yup.string()
            .required('Pole nie może być puste.'),
        newInterface: Yup.string()
            .required('Pole nie może być puste.'),
        newSystem: Yup.string()
            .required('Pole nie może być puste.'),
        newPurpose: Yup.string()
            .required('Pole nie może być puste.'),
        newSwitch: Yup.string()
            .required('Pole nie może być puste.'),
    })

    const handleEditClick=(product)=>{
        setEditData(true);
        setProductId(product.id);
        setProductName(product.name);
        setProductPrice(product.price);
        setProductQuantity(product.quantity);
        setProductConnection(product.spec1);
        setProductInterface(product.spec2);
        setProductSystem(product.spec3);
        setProductPurpose(product.spec4);
        setProductSwitch(product.spec5);
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

    const addNewKeyboard=(values)=>{
        var name=values.name;
        var price=values.price;
        var quantity=values.quantity;
        var connection=values.connection;
        var interface1=values.interface;
        var system=values.system;
        var purpose=values.purpose;
        var switch1=values.switch;
        var request="http://localhost:8080/api/v1/other/add-new-product/6/"+name+"/"+price+"/"+
        quantity+"/"+connection+"/"+interface1+"/"+system+"/"+purpose+"/"+switch1;
        axios.post(request).then(response=>{
            getData();
        })
        setAddData(false);
    }

    const updateKeyboard=(values)=>{
        var name=values.newName;
        var price=values.newPrice;
        var quantity=values.newQuantity;
        var connection=values.newConnection;
        var interface1=values.newInterface;
        var system=values.newSystem;
        var purpose=values.newPurpose;
        var switch1=values.newSwitch;
        var request="http://localhost:8080/api/v1/other/update-product-by-id/"+productId+"/"+name+"/"+price+"/"+
        quantity+"/"+connection+"/"+interface1+"/"+system+"/"+purpose+"/"+switch1;
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
                    <th>Łączność</th>
                    <th>Interfejs</th>
                    <th>Obsługiwane systemy</th>
                    <th>Preznaczenie</th>
                    <th>Rodzaj przełączników</th>
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
                        <Formik initialValues={intialValuesAdd} validationSchema={validationSchemaAdd} onSubmit={(values)=>{addNewKeyboard(values)}}>
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

                                <label className="form-label">Łączność</label>
                                <Field name="connection" autoComplete="off"></Field>
                                <ErrorMessage name="connection" className="error-style" component="div"></ErrorMessage>

                                <label className="form-label">Interfejs</label>
                                <Field name="interface" autoComplete="off"></Field>
                                <ErrorMessage name="interface" className="error-style" component="div"></ErrorMessage>

                                <label className="form-label">Obsługiwane systemy</label>
                                <Field name="system" autoComplete="off"></Field>
                                <ErrorMessage name="system" className="error-style" component="div"></ErrorMessage>

                                <label className="form-label">Preznaczenie</label>
                                <Field name="purpose" autoComplete="off"></Field>
                                <ErrorMessage name="purpose" className="error-style" component="div"></ErrorMessage>

                                <label className="form-label">Rodzaj przełączników</label>
                                <Field name="switch" autoComplete="off"></Field>
                                <ErrorMessage name="switch" className="error-style" component="div"></ErrorMessage>

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
                        <Formik initialValues={intialValuesUpdate} validationSchema={validationSchemaUpdate} onSubmit={(values)=>{updateKeyboard(values)}}>
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

                                <label className="form-label">Łączność</label>
                                <Field name="newConnection" autoComplete="off"></Field>
                                <ErrorMessage name="newConnection" className="error-style" component="div"></ErrorMessage>

                                <label className="form-label">Interfejs</label>
                                <Field name="newInterface" autoComplete="off"></Field>
                                <ErrorMessage name="newInterface" className="error-style" component="div"></ErrorMessage>

                                <label className="form-label">Obsługiwane systemy</label>
                                <Field name="newSystem" autoComplete="off"></Field>
                                <ErrorMessage name="newSystem" className="error-style" component="div"></ErrorMessage>

                                <label className="form-label">Preznaczenie</label>
                                <Field name="newPurpose" autoComplete="off"></Field>
                                <ErrorMessage name="newPurpose" className="error-style" component="div"></ErrorMessage>

                                <label className="form-label">Rodzaj przełączników</label>
                                <Field name="newSwitch" autoComplete="off"></Field>
                                <ErrorMessage name="newSwitch" className="error-style" component="div"></ErrorMessage>

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