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

export default function MonitorsTable(){

    const [data, setData]=useState([]);
    const [addData, setAddData]=useState(false);
    const [editData, setEditData]=useState(false);
    const [productId, setProductId]=useState();
    const [productName, setProductName]=useState();
    const [productPrice, setProductPrice]=useState();
    const [productQuantity, setProductQuantity]=useState();
    const [productScreenSize, setProductScreenSize]=useState();
    const [productRefresh, setProductRefresh]=useState();
    const [productScreenFormat, setProductScreenFormat]=useState();
    const [productResolution, setProductResolution]=useState();
    const [productConnectors, setProductConnectors]=useState();

    useEffect(()=>{
        getData()
    }, []);

    function getData(){
        axios.get("http://localhost:8080/api/v1/other/products-by-category/7")
        .then(response=>{
            setData(response.data);
        });
    }

    const intialValuesAdd={
        name: '',
        price: 0,
        quantity: 0,
        screenSize: 0,
        refresh: 0,
        screenFormat: '',
        resolution: '',
        connectors: ''
    }

    const intialValuesUpdate={
        newName: productName,
        newPrice: productPrice,
        newQuantity: productQuantity,
        newScreenSize: productScreenSize,
        newRefresh: productRefresh,
        newScreenFormat: productScreenFormat,
        newResolution: productResolution,
        newConnectors: productConnectors
    }

    const validationSchemaAdd=Yup.object({
        name: Yup.string()
            .required('Pole nie może być puste.'),
        price: Yup.number()
            .required('Pole nie może być puste.'),
        quantity: Yup.number()
            .required('Pole nie może być puste.'),    
        screenSize: Yup.number()
            .required('Pole nie może być puste.'),
        refresh: Yup.number()
            .required('Pole nie może być puste.'),
        screenFormat: Yup.string()
            .required('Pole nie może być puste.'),
        resolution: Yup.string()
            .required('Pole nie może być puste.'),
        connectors: Yup.string()
            .required('Pole nie może być puste.'),
    })

    const validationSchemaUpdate=Yup.object({
        newName: Yup.string()
            .required('Pole nie może być puste.'),
        newPrice: Yup.number()
            .required('Pole nie może być puste.'),
        newQuantity: Yup.number()
            .required('Pole nie może być puste.'),    
        newScreenSize: Yup.number()
            .required('Pole nie może być puste.'),
        newRefresh: Yup.number()
            .required('Pole nie może być puste.'),
        newScreenFormat: Yup.string()
            .required('Pole nie może być puste.'),
        newResolution: Yup.string()
            .required('Pole nie może być puste.'),
        newConnectors: Yup.string()
            .required('Pole nie może być puste.'),
    })

    const handleEditClick=(product)=>{
        setEditData(true);
        setProductId(product.id);
        setProductName(product.name);
        setProductPrice(product.price);
        setProductQuantity(product.quantity);
        setProductScreenSize(product.spec1);
        setProductRefresh(product.spec2);
        setProductScreenFormat(product.spec3);
        setProductResolution(product.spec4);
        setProductConnectors(product.spec5);
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

    const addNewMonitor=(values)=>{
        var name=values.name;
        var price=values.price;
        var quantity=values.quantity;
        var screenSize=values.screenSize;
        var refresh=values.refresh;
        var screenFormat=values.screenFormat;
        var resolution=values.resolution;
        var connectors=values.connectors;
        var request="http://localhost:8080/api/v1/other/add-new-product/7/"+name+"/"+price+"/"+
        quantity+"/"+screenSize+"/"+refresh+"/"+screenFormat+"/"+resolution+"/"+connectors;
        axios.post(request).then(response=>{
            getData();
        })
        setAddData(false);
    }

    const updateMonitor=(values)=>{
        var name=values.newName;
        var price=values.newPrice;
        var quantity=values.newQuantity;
        var screenSize=values.newScreenSize;
        var refresh=values.newRefresh;
        var screenFormat=values.newScreenFormat;
        var resolution=values.newResolution;
        var connectors=values.newConnectors;
        var request="http://localhost:8080/api/v1/other/update-product-by-id/"+productId+"/"+name+"/"+price+"/"+
        quantity+"/"+screenSize+"/"+refresh+"/"+screenFormat+"/"+resolution+"/"+connectors;
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
                    <th>Przekątna ekranu</th>
                    <th>Częstotliwość odświeżania</th>
                    <th>Format obrazu</th>
                    <th>Rozdzielczosć</th>
                    <th>Złącza</th>
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
                        <Formik initialValues={intialValuesAdd} validationSchema={validationSchemaAdd} onSubmit={(values)=>{addNewMonitor(values)}}>
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

                                <label className="form-label">Przekątna ekranu</label>
                                <Field name="screenSize" autoComplete="off"></Field>
                                <ErrorMessage name="screenSize" className="error-style" component="div"></ErrorMessage>

                                <label className="form-label">Częstotliwość odświeżania</label>
                                <Field name="refresh" autoComplete="off"></Field>
                                <ErrorMessage name="refresh" className="error-style" component="div"></ErrorMessage>

                                <label className="form-label">Format obrazu</label>
                                <Field name="screenFormat" autoComplete="off"></Field>
                                <ErrorMessage name="screenFormat" className="error-style" component="div"></ErrorMessage>

                                <label className="form-label">Rozdzielczosć</label>
                                <Field name="resolution" autoComplete="off"></Field>
                                <ErrorMessage name="resolution" className="error-style" component="div"></ErrorMessage>

                                <label className="form-label">Złącza</label>
                                <Field name="connectors" autoComplete="off"></Field>
                                <ErrorMessage name="connectors" className="error-style" component="div"></ErrorMessage>

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
                        <Formik initialValues={intialValuesUpdate} validationSchema={validationSchemaUpdate} onSubmit={(values)=>{updateMonitor(values)}}>
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

                                <label className="form-label">Przekątna ekranu</label>
                                <Field name="newScreenSize" autoComplete="off"></Field>
                                <ErrorMessage name="newScreenSize" className="error-style" component="div"></ErrorMessage>

                                <label className="form-label">Częstotliwość odświeżania</label>
                                <Field name="newRefresh" autoComplete="off"></Field>
                                <ErrorMessage name="newRefresh" className="error-style" component="div"></ErrorMessage>

                                <label className="form-label">Format obrazu</label>
                                <Field name="newScreenFormat" autoComplete="off"></Field>
                                <ErrorMessage name="newScreenFormat" className="error-style" component="div"></ErrorMessage>

                                <label className="form-label">Rozdzielczosć</label>
                                <Field name="newResolution" autoComplete="off"></Field>
                                <ErrorMessage name="newResolution" className="error-style" component="div"></ErrorMessage>

                                <label className="form-label">Złącza</label>
                                <Field name="newConnectors" autoComplete="off"></Field>
                                <ErrorMessage name="newConnectors" className="error-style" component="div"></ErrorMessage>

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