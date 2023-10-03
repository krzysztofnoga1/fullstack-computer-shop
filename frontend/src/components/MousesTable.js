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

export default function MousesTable(){

    const [data, setData]=useState([]);
    const [addData, setAddData]=useState(false);
    const [editData, setEditData]=useState(false);
    const [productId, setProductId]=useState();
    const [productName, setProductName]=useState();
    const [productPrice, setProductPrice]=useState();
    const [productQuantity, setProductQuantity]=useState();
    const [productConnection, setProductConnection]=useState();
    const [productSensor, setProductSensor]=useState();
    const [productResolution, setProductResolution]=useState();
    const [productButtons, setProductButtons]=useState();
    const [productType, setProductType]=useState();

    useEffect(()=>{
        getData()
    }, []);

    function getData(){
        axios.get("http://localhost:8080/api/v1/other/products-by-category/5")
        .then(response=>{
            setData(response.data);
        });
    }

    const intialValuesAdd={
        name: '',
        price: 0,
        quantity: 0,
        connection:'' ,
        sensor: '',
        resolution: 0,
        buttons: 0,
        type: ''
    }

    const intialValuesUpdate={
        newName: productName,
        newPrice: productPrice,
        newQuantity: productQuantity,
        newConnection: productConnection,
        newSensor: productSensor,
        newResolution: productResolution,
        newButtons: productButtons,
        newType: productType
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
        sensor: Yup.string()
            .required('Pole nie może być puste.'),
        resolution: Yup.number()
            .required('Pole nie może być puste.'),
        buttons: Yup.number()
            .required('Pole nie może być puste.'),
        type: Yup.string()
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
        newSensor: Yup.string()
            .required('Pole nie może być puste.'),
        newResolution: Yup.number()
            .required('Pole nie może być puste.'),
        newButtons: Yup.number()
            .required('Pole nie może być puste.'),
        newType: Yup.string()
            .required('Pole nie może być puste.'),
    })

    const handleEditClick=(product)=>{
        setEditData(true);
        setProductId(product.id);
        setProductName(product.name);
        setProductPrice(product.price);
        setProductQuantity(product.quantity);
        setProductConnection(product.spec1);
        setProductSensor(product.spec2);
        setProductResolution(product.spec3);
        setProductButtons(product.spec4);
        setProductType(product.spec5);
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

    const addNewMouse=(values)=>{
        var name=values.name;
        var price=values.price;
        var quantity=values.quantity;
        var connection=values.connection;
        var sensor=values.sensor;
        var resolution=values.resolution;
        var buttons=values.buttons;
        var type=values.type;
        var request="http://localhost:8080/api/v1/other/add-new-product/5/"+name+"/"+price+"/"+
        quantity+"/"+connection+"/"+sensor+"/"+resolution+"/"+buttons+"/"+type;
        axios.post(request).then(response=>{
            getData();
        })
        setAddData(false);
    }

    const updateMouse=(values)=>{
        var name=values.newName;
        var price=values.newPrice;
        var quantity=values.newQuantity;
        var connection=values.newConnection;
        var sensor=values.newSensor;
        var resolution=values.newResolution;
        var buttons=values.newButtons;
        var type=values.newType;
        var request="http://localhost:8080/api/v1/other/update-product-by-id/"+productId+"/"+name+"/"+price+"/"+
        quantity+"/"+connection+"/"+sensor+"/"+resolution+"/"+buttons+"/"+type;
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
                    <th>Łączność</th>
                    <th>Sensor</th>
                    <th>Rozdzielczość(DPI)</th>
                    <th>Liczba przycisków</th>
                    <th>Typ</th>
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
                        <Formik initialValues={intialValuesAdd} validationSchema={validationSchemaAdd} onSubmit={(values)=>{addNewMouse(values)}}>
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

                                <label className="form-label">Sensor</label>
                                <Field name="sensor" autoComplete="off"></Field>
                                <ErrorMessage name="sensor" className="error-style" component="div"></ErrorMessage>

                                <label className="form-label">Rozdzielczość(DPI)</label>
                                <Field name="resolution" autoComplete="off"></Field>
                                <ErrorMessage name="resolution" className="error-style" component="div"></ErrorMessage>

                                <label className="form-label">Liczba przycisków</label>
                                <Field name="buttons" autoComplete="off"></Field>
                                <ErrorMessage name="buttons" className="error-style" component="div"></ErrorMessage>

                                <label className="form-label">Typ</label>
                                <Field name="type" autoComplete="off"></Field>
                                <ErrorMessage name="type" className="error-style" component="div"></ErrorMessage>

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
                        <Formik initialValues={intialValuesUpdate} validationSchema={validationSchemaUpdate} onSubmit={(values)=>{updateMouse(values)}}>
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

                                <label className="form-label">Sensor</label>
                                <Field name="newSensor" autoComplete="off"></Field>
                                <ErrorMessage name="newSensor" className="error-style" component="div"></ErrorMessage>

                                <label className="form-label">Rozdzielczość(DPI)</label>
                                <Field name="newResolution" autoComplete="off"></Field>
                                <ErrorMessage name="newResolution" className="error-style" component="div"></ErrorMessage>

                                <label className="form-label">Liczba przycisków</label>
                                <Field name="newButtons" autoComplete="off"></Field>
                                <ErrorMessage name="newButtons" className="error-style" component="div"></ErrorMessage>

                                <label className="form-label">Typ</label>
                                <Field name="newType" autoComplete="off"></Field>
                                <ErrorMessage name="newType" className="error-style" component="div"></ErrorMessage>

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