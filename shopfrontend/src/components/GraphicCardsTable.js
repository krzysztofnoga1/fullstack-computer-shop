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

export default function GraphiCardsTable(){

    const [data, setData]=useState([]);
    const [addData, setAddData]=useState(false);
    const [editData, setEditData]=useState(false);
    const [productId, setProductId]=useState();
    const [productName, setProductName]=useState();
    const [productPrice, setProductPrice]=useState();
    const [productQuantity, setProductQuantity]=useState();
    const [productSystem, setProductSystem]=useState();
    const [productConnector, setProductConnector]=useState();
    const [productMemory, setProductMemory]=useState();
    const [productMemoryType, setProductMemoryType]=useState();
    const [productOutputs, setProductOutputs]=useState();

    const intialValuesAdd={
        name: '',
        price: 0,
        quantity: 0,
        system: '',
        connector: '',
        memory: 0,
        memoryType: '',
        outputs: ''
    }

    const intialValuesUpdate={
        newName: productName,
        newPrice: productPrice,
        newQuantity: productQuantity,
        newSystem: productSystem,
        newConnector: productConnector,
        newMemory: productMemory,
        newMemoryType: productMemoryType,
        newOutputs: productOutputs
    }

    const validationSchemaAdd=Yup.object({
        name: Yup.string()
            .required('Pole nie może być puste.'),
        price: Yup.number()
            .required('Pole nie może być puste.'),
        quantity: Yup.number()
            .required('Pole nie może być puste.'),    
        system: Yup.string()
            .required('Pole nie może być puste.'),
        connector: Yup.string()
            .required('Pole nie może być puste.'),
        memory: Yup.number()
            .required('Pole nie może być puste.'),
        memoryType: Yup.string()
            .required('Pole nie może być puste.'),
        outputs: Yup.string()
            .required('Pole nie może być puste.'),
    })

    const validationSchemaUpdate=Yup.object({
        newName: Yup.string()
            .required('Pole nie może być puste.'),
        newPrice: Yup.number()
            .required('Pole nie może być puste.'),
        newQuantity: Yup.number()
            .required('Pole nie może być puste.'),    
        newSystem: Yup.string()
            .required('Pole nie może być puste.'),
        newConnector: Yup.string()
            .required('Pole nie może być puste.'),
        newMemory: Yup.number()
            .required('Pole nie może być puste.'),
        newMemoryType: Yup.string()
            .required('Pole nie może być puste.'),
        newOutputs: Yup.string()
            .required('Pole nie może być puste.'),
    })

    useEffect(()=>{
        getData()
    }, []);

    function getData(){
        axios.get("http://localhost:8080/api/v1/other/products-by-category/1")
        .then(response=>{
            setData(response.data);
        });
    }

    const handleEditClick=(product)=>{
        setEditData(true);
        setProductId(product.id);
        setProductName(product.name);
        setProductPrice(product.price);
        setProductQuantity(product.quantity);
        setProductSystem(product.spec1);
        setProductConnector(product.spec2);
        setProductMemory(product.spec3);
        setProductMemoryType(product.spec4);
        setProductOutputs(product.spec5);
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

    const addNewGraphicCard=(values)=>{
        var name=values.name;
        var price=values.price;
        var quantity=values.quantity;
        var system=values.system;
        var connector=values.connector;
        var memory=values.memory;
        var memoryType=values.memoryType;
        var outputs=values.outputs;
        var request="http://localhost:8080/api/v1/other/add-new-product/1/"+name+"/"+price+"/"+
        quantity+"/"+system+"/"+connector+"/"+memory+"/"+memoryType+"/"+outputs;
        axios.post(request).then(response=>{
            getData();
        })
        setAddData(false);
    }

    const updateGraphicCard=(values)=>{
        var name=values.newName;
        var price=values.newPrice;
        var quantity=values.newQuantity;
        var system=values.newSystem;
        var connector=values.newConnector;
        var memory=values.newMemory;
        var memoryType=values.newMemoryType;
        var outputs=values.newOutputs;
        var request="http://localhost:8080/api/v1/other/update-product-by-id/"+productId+"/"+name+"/"+price+"/"+
        quantity+"/"+system+"/"+connector+"/"+memory+"/"+memoryType+"/"+outputs;
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
                    <th>Układ</th>
                    <th>Złącze</th>
                    <th>Pamięć(GB)</th>
                    <th>Rodzaj pamięci</th>
                    <th>Wyjścia</th>
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
                        <Formik initialValues={intialValuesAdd} validationSchema={validationSchemaAdd} onSubmit={(values)=>{addNewGraphicCard(values)}}>
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

                                <label className="form-label">Układ</label>
                                <Field name="system" autoComplete="off"></Field>
                                <ErrorMessage name="system" className="error-style" component="div"></ErrorMessage>

                                <label className="form-label">Złącze</label>
                                <Field name="connector" autoComplete="off"></Field>
                                <ErrorMessage name="connector" className="error-style" component="div"></ErrorMessage>

                                <label className="form-label">Pamięć(GB)</label>
                                <Field name="memory" autoComplete="off"></Field>
                                <ErrorMessage name="memory" className="error-style" component="div"></ErrorMessage>

                                <label className="form-label">Rodzaj pamięci</label>
                                <Field name="memoryType" autoComplete="off"></Field>
                                <ErrorMessage name="memoryType" className="error-style" component="div"></ErrorMessage>

                                <label className="form-label">Wyjścia</label>
                                <Field name="outputs" autoComplete="off"></Field>
                                <ErrorMessage name="outputs" className="error-style" component="div"></ErrorMessage>

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
                        <Formik initialValues={intialValuesUpdate} validationSchema={validationSchemaUpdate} onSubmit={(values)=>{updateGraphicCard(values)}}>
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
                                <Field name="newSystem" autoComplete="off"></Field>
                                <ErrorMessage name="newSystem" className="error-style" component="div"></ErrorMessage>

                                <label className="form-label">Złącze</label>
                                <Field name="newConnector" autoComplete="off"></Field>
                                <ErrorMessage name="newConnector" className="error-style" component="div"></ErrorMessage>

                                <label className="form-label">Pamięć(GB)</label>
                                <Field name="newMemory" autoComplete="off"></Field>
                                <ErrorMessage name="newMemory" className="error-style" component="div"></ErrorMessage>

                                <label className="form-label">Rodzaj pamięci</label>
                                <Field name="newMemoryType" autoComplete="off"></Field>
                                <ErrorMessage name="newMemoryType" className="error-style" component="div"></ErrorMessage>

                                <label className="form-label">Wyjścia</label>
                                <Field name="newOutputs" autoComplete="off"></Field>
                                <ErrorMessage name="newOutputs" className="error-style" component="div"></ErrorMessage>

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