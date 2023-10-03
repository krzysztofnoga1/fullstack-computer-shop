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

export default function MotherBoardsTable(){

    const [data, setData]=useState([]);
    const [addData, setAddData]=useState(false);
    const [editData, setEditData]=useState(false);
    const [productId, setProductId]=useState();
    const [productName, setProductName]=useState();
    const [productPrice, setProductPrice]=useState();
    const [productQuantity, setProductQuantity]=useState();
    const [productSocket, setProductSocket]=useState();
    const [productCompatibleProcessors, setProductCompatibleProcessors]=useState();
    const [productCompatibleMemory, setProductCompatibleMemory]=useState();
    const [productMaxRam, setProductMaxRam]=useState();
    const [productConnectors, setProductConnectors]=useState();

    useEffect(()=>{
        getData()
    }, []);

    function getData(){
        axios.get("http://localhost:8080/api/v1/other/products-by-category/4")
        .then(response=>{
            setData(response.data);
        });
    }

    const intialValuesAdd={
        name: '',
        price: 0,
        quantity: 0,
        socket: 0 ,
        compatibleProcessors: '',
        compatibleMemory: '',
        maxRam: 0,
        connectors: 0
    }

    const intialValuesUpdate={
        newName: productName,
        newPrice: productPrice,
        newQuantity: productQuantity,
        newSocket: productSocket,
        newCompatibleProcessors: productCompatibleProcessors,
        newCompatibleMemory: productCompatibleMemory,
        newMaxRam: productMaxRam,
        newConnectors: productConnectors
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
        compatibleProcessors: Yup.string()
            .required('Pole nie może być puste.'),
        compatibleMemory: Yup.string()
            .required('Pole nie może być puste.'),
        maxRam: Yup.number()
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
        newSocket: Yup.number()
            .required('Pole nie może być puste.'),
        newCompatibleProcessors: Yup.string()
            .required('Pole nie może być puste.'),
        newCompatibleMemory: Yup.string()
            .required('Pole nie może być puste.'),
        newMaxRam: Yup.number()
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
        setProductSocket(product.spec1);
        setProductCompatibleProcessors(product.spec2);
        setProductCompatibleMemory(product.spec3);
        setProductMaxRam(product.spec4);
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

    const addNewMotherBoard=(values)=>{
        var name=values.name;
        var price=values.price;
        var quantity=values.quantity;
        var socket=values.socket;
        var compatibleProcessors=values.compatibleProcessors;
        var compatibleMemory=values.compatibleMemory;
        var maxRam=values.maxRam;
        var connectors=values.connectors;
        var request="http://localhost:8080/api/v1/other/add-new-product/4/"+name+"/"+price+"/"+
        quantity+"/"+socket+"/"+compatibleProcessors+"/"+compatibleMemory+"/"+maxRam+"/"+connectors;
        axios.post(request).then(response=>{
            getData();
        })
        setAddData(false);
    }

    const updateMotherBoard=(values)=>{
        var name=values.newName;
        var price=values.newPrice;
        var quantity=values.newQuantity;
        var socket=values.newSocket;
        var compatibleProcessors=values.newCompatibleProcessors;
        var compatibleMemory=values.newCompatibleMemory;
        var maxRam=values.newMaxRam;
        var connectors=values.newConnectors;
        var request="http://localhost:8080/api/v1/other/update-product-by-id/"+productId+"/"+name+"/"+price+"/"+
        quantity+"/"+socket+"/"+compatibleProcessors+"/"+compatibleMemory+"/"+maxRam+"/"+connectors;
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
                    <th>Gniazdo procesora</th>
                    <th>Obsługiwane rodziny procesorów</th>
                    <th>Typy obsługiwanej pamięci</th>
                    <th>Maksymalna wielkość pamięci RAM(GB)</th>
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
                        <Formik initialValues={intialValuesAdd} validationSchema={validationSchemaAdd} onSubmit={(values)=>{addNewMotherBoard(values)}}>
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

                                <label className="form-label">Gniazdo procesora</label>
                                <Field name="socket" autoComplete="off"></Field>
                                <ErrorMessage name="socket" className="error-style" component="div"></ErrorMessage>

                                <label className="form-label">Obsługiwane rodziny procesorów</label>
                                <Field name="compatibleProcessors" autoComplete="off"></Field>
                                <ErrorMessage name="compatibleProcessors" className="error-style" component="div"></ErrorMessage>

                                <label className="form-label">Typy obsługiwanej pamięci</label>
                                <Field name="compatibleMemory" autoComplete="off"></Field>
                                <ErrorMessage name="compatibleMemory" className="error-style" component="div"></ErrorMessage>

                                <label className="form-label">Maksymalna wielkość pamięci RAM(GB)</label>
                                <Field name="maxRam" autoComplete="off"></Field>
                                <ErrorMessage name="maxRam" className="error-style" component="div"></ErrorMessage>

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
                        <Formik initialValues={intialValuesUpdate} validationSchema={validationSchemaUpdate} onSubmit={(values)=>{updateMotherBoard(values)}}>
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

                                <label className="form-label">Gniazdo procesora</label>
                                <Field name="newSocket" autoComplete="off"></Field>
                                <ErrorMessage name="newSocket" className="error-style" component="div"></ErrorMessage>

                                <label className="form-label">Obsługiwane rodziny procesorów</label>
                                <Field name="newCompatibleProcessors" autoComplete="off"></Field>
                                <ErrorMessage name="newCompatibleProcessors" className="error-style" component="div"></ErrorMessage>

                                <label className="form-label">Typy obsługiwanej pamięci</label>
                                <Field name="newCompatibleMemory" autoComplete="off"></Field>
                                <ErrorMessage name="newCompatibleMemory" className="error-style" component="div"></ErrorMessage>

                                <label className="form-label">Maksymalna wielkość pamięci RAM(GB)</label>
                                <Field name="newMaxRam" autoComplete="off"></Field>
                                <ErrorMessage name="newMaxRam" className="error-style" component="div"></ErrorMessage>

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