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

export default function HeadsetsTable(){

    const [data, setData]=useState([]);
    const [addData, setAddData]=useState(false);
    const [editData, setEditData]=useState(false);
    const [productId, setProductId]=useState();
    const [productName, setProductName]=useState();
    const [productPrice, setProductPrice]=useState();
    const [productQuantity, setProductQuantity]=useState();
    const [productConnection, setProductConnection]=useState();
    const [productBuild, setProductBuild]=useState();
    const [productConnectors, setProductConnectors]=useState();
    const [productSystems, setProductSystems]=useState();
    const [productMic, setProductMic]=useState();

    useEffect(()=>{
        getData()
    }, []);

    function getData(){
        axios.get("http://localhost:8080/api/v1/other/products-by-category/8")
        .then(response=>{
            setData(response.data);
        });
    }

    const intialValuesAdd={
        name: '',
        price: 0,
        quantity: 0,
        connection: '',
        build: '',
        connectors: '',
        systems: '',
        mic: ''
    }

    const intialValuesUpdate={
        newName: productName,
        newPrice: productPrice,
        newQuantity: productQuantity,
        newConnection: productConnection,
        newBuild: productBuild,
        newConnectors: productConnectors,
        newSystems: productSystems,
        newMic: productMic
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
        build: Yup.string()
            .required('Pole nie może być puste.'),
        connectors: Yup.string()
            .required('Pole nie może być puste.'),
        systems: Yup.string()
            .required('Pole nie może być puste.'),
        mic: Yup.string()
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
        newBuild: Yup.string()
            .required('Pole nie może być puste.'),
        newConnectors: Yup.string()
            .required('Pole nie może być puste.'),
        newSystems: Yup.string()
            .required('Pole nie może być puste.'),
        newMic: Yup.string()
            .required('Pole nie może być puste.'),
    })

    const handleEditClick=(product)=>{
        setEditData(true);
        setProductId(product.id);
        setProductName(product.name);
        setProductPrice(product.price);
        setProductQuantity(product.quantity);
        setProductConnection(product.spec1);
        setProductBuild(product.spec2);
        setProductConnectors(product.spec3);
        setProductSystems(product.spec4);
        setProductMic(product.spec5);
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

    const addNewHeadset=(values)=>{
        var name=values.name;
        var price=values.price;
        var quantity=values.quantity;
        var connection=values.connection;
        var build=values.build;
        var connectors=values.connectors;
        var systems=values.systems;
        var mic=values.mic;
        var request="http://localhost:8080/api/v1/other/add-new-product/8/"+name+"/"+price+"/"+
        quantity+"/"+connection+"/"+build+"/"+connectors+"/"+systems+"/"+mic;
        axios.post(request).then(response=>{
            getData();
        })
        setAddData(false);
    }

    const updateHeadset=(values)=>{
        var name=values.newName;
        var price=values.newPrice;
        var quantity=values.newQuantity;
        var connection=values.newConnection;
        var build=values.newBuild;
        var connectors=values.newConnectors;
        var systems=values.newSystems;
        var mic=values.newMic;
        var request="http://localhost:8080/api/v1/other/update-product-by-id/"+productId+"/"+name+"/"+price+"/"+
        quantity+"/"+connection+"/"+build+"/"+connectors+"/"+systems+"/"+mic;
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
                    <th>Budowa</th>
                    <th>Złącze</th>
                    <th>Kompatybilność</th>
                    <th>Mikrofon</th>
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
                        <Formik initialValues={intialValuesAdd} validationSchema={validationSchemaAdd} onSubmit={(values)=>{addNewHeadset(values)}}>
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

                                <label className="form-label">Budowa</label>
                                <Field name="build" autoComplete="off"></Field>
                                <ErrorMessage name="build" className="error-style" component="div"></ErrorMessage>

                                <label className="form-label">Złącze</label>
                                <Field name="connectors" autoComplete="off"></Field>
                                <ErrorMessage name="connectors" className="error-style" component="div"></ErrorMessage>

                                <label className="form-label">Kompatybilność</label>
                                <Field name="systems" autoComplete="off"></Field>
                                <ErrorMessage name="systems" className="error-style" component="div"></ErrorMessage>

                                <label className="form-label">Mikrofon</label>
                                <Field name="mic" autoComplete="off"></Field>
                                <ErrorMessage name="mic" className="error-style" component="div"></ErrorMessage>

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
                        <Formik initialValues={intialValuesUpdate} validationSchema={validationSchemaUpdate} onSubmit={(values)=>{updateHeadset(values)}}>
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
                                <Field name="newConnections" autoComplete="off"></Field>
                                <ErrorMessage name="newConnection" className="error-style" component="div"></ErrorMessage>

                                <label className="form-label">Budowa</label>
                                <Field name="newBuild" autoComplete="off"></Field>
                                <ErrorMessage name="newBuild" className="error-style" component="div"></ErrorMessage>

                                <label className="form-label">Złącze</label>
                                <Field name="newConnectors" autoComplete="off"></Field>
                                <ErrorMessage name="newConnectors" className="error-style" component="div"></ErrorMessage>

                                <label className="form-label">Kompatybilność</label>
                                <Field name="newSystems" autoComplete="off"></Field>
                                <ErrorMessage name="newSystems" className="error-style" component="div"></ErrorMessage>

                                <label className="form-label">Mikrofon</label>
                                <Field name="newMic" autoComplete="off"></Field>
                                <ErrorMessage name="newMic" className="error-style" component="div"></ErrorMessage>

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