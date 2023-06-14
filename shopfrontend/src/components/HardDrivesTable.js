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

export default function HardDrivesTable(){

    const [data, setData]=useState([]);
    const [addData, setAddData]=useState(false);
    const [editData, setEditData]=useState(false);
    const [productId, setProductId]=useState();
    const [productName, setProductName]=useState();
    const [productPrice, setProductPrice]=useState();
    const [productQuantity, setProductQuantity]=useState();
    const [productMemory, setProductMemory]=useState();
    const [productType, setProductType]=useState();
    const [productInterface, setProductInterface]=useState();
    const [productReadSpeed, setProductReadSpeed]=useState();
    const [productSaveSpeed, setProductSaveSpeed]=useState();

    useEffect(()=>{
        getData()
    }, []);

    function getData(){
        axios.get("http://localhost:8080/api/v1/other/products-by-category/3")
        .then(response=>{
            setData(response.data);
        });
    }

    const intialValuesAdd={
        name: '',
        price: 0,
        quantity: 0,
        memory: 0 ,
        type: '',
        interface: '',
        readSpeed: 0,
        saveSpeed: 0
    }

    const intialValuesUpdate={
        newName: productName,
        newPrice: productPrice,
        newQuantity: productQuantity,
        newMemory: productMemory,
        newType: productType,
        newInterface: productInterface,
        newReadSpeed: productReadSpeed,
        newSaveSpeed: productSaveSpeed
    }

    const validationSchemaAdd=Yup.object({
        name: Yup.string()
            .required('Pole nie może być puste.'),
        price: Yup.number()
            .required('Pole nie może być puste.'),
        quantity: Yup.number()
            .required('Pole nie może być puste.'),    
        memory: Yup.number()
            .required('Pole nie może być puste.'),
        type: Yup.string()
            .required('Pole nie może być puste.'),
        interface: Yup.string()
            .required('Pole nie może być puste.'),
        readSpeed: Yup.number()
            .required('Pole nie może być puste.'),
        saveSpeed: Yup.number()
            .required('Pole nie może być puste.'),
    })

    const validationSchemaUpdate=Yup.object({
        newName: Yup.string()
            .required('Pole nie może być puste.'),
        newPrice: Yup.number()
            .required('Pole nie może być puste.'),
        newQuantity: Yup.number()
            .required('Pole nie może być puste.'),    
        newMemory: Yup.number()
            .required('Pole nie może być puste.'),
        newType: Yup.string()
            .required('Pole nie może być puste.'),
        newInterface: Yup.string()
            .required('Pole nie może być puste.'),
        newReadSpeed: Yup.number()
            .required('Pole nie może być puste.'),
        newSaveSpeed: Yup.number()
            .required('Pole nie może być puste.'),
    })

    const handleEditClick=(product)=>{
        setEditData(true);
        setProductId(product.id);
        setProductName(product.name);
        setProductPrice(product.price);
        setProductQuantity(product.quantity);
        setProductMemory(product.spec1);
        setProductType(product.spec2);
        setProductInterface(product.spec3);
        setProductReadSpeed(product.spec4);
        setProductSaveSpeed(product.spec5);
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

    const addNewHardDrive=(values)=>{
        var name=values.name;
        var price=values.price;
        var quantity=values.quantity;
        var memory=values.memory;
        var type=values.type;
        var interface1=values.interface;
        var readSpeed=values.readSpeed;
        var saveSpeed=values.saveSpeed;
        var request="http://localhost:8080/api/v1/other/add-new-product/3/"+name+"/"+price+"/"+
        quantity+"/"+memory+"/"+type+"/"+interface1+"/"+readSpeed+"/"+saveSpeed;
        axios.post(request).then(response=>{
            getData();
        })
        setAddData(false);
    }

    const updateHardDrive=(values)=>{
        var name=values.newName;
        var price=values.newPrice;
        var quantity=values.newQuantity;
        var memory=values.newMemory;
        var type=values.newType;
        var interface1=values.newInterface;
        var readSpeed=values.newReadSpeed;
        var saveSpeed=values.newSaveSpeed;
        var request="http://localhost:8080/api/v1/other/update-product-by-id/"+productId+"/"+name+"/"+price+"/"+
        quantity+"/"+memory+"/"+type+"/"+interface1+"/"+readSpeed+"/"+saveSpeed;
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
                    <th>Pojemność</th>
                    <th>Typ</th>
                    <th>Interfejs</th>
                    <th>Prędkość odczytu(MB/s)</th>
                    <th>Prędkość zapisu(MB/s)</th>
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
                        <Formik initialValues={intialValuesAdd} validationSchema={validationSchemaAdd} onSubmit={(values)=>{addNewHardDrive(values)}}>
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
                                <Field name="memory" autoComplete="off"></Field>
                                <ErrorMessage name="memory" className="error-style" component="div"></ErrorMessage>

                                <label className="form-label">Taktowanie</label>
                                <Field name="type" autoComplete="off"></Field>
                                <ErrorMessage name="type" className="error-style" component="div"></ErrorMessage>

                                <label className="form-label">Rdzenie</label>
                                <Field name="interface" autoComplete="off"></Field>
                                <ErrorMessage name="interface" className="error-style" component="div"></ErrorMessage>

                                <label className="form-label">Pamięć podręczna(MB)</label>
                                <Field name="readSpeed" autoComplete="off"></Field>
                                <ErrorMessage name="readSpeed" className="error-style" component="div"></ErrorMessage>

                                <label className="form-label">Wątki</label>
                                <Field name="saveSpeed" autoComplete="off"></Field>
                                <ErrorMessage name="saveSpeed" className="error-style" component="div"></ErrorMessage>

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
                        <Formik initialValues={intialValuesUpdate} validationSchema={validationSchemaUpdate} onSubmit={(values)=>{updateHardDrive(values)}}>
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
                                <Field name="newMemory" autoComplete="off"></Field>
                                <ErrorMessage name="newMemory" className="error-style" component="div"></ErrorMessage>

                                <label className="form-label">Złącze</label>
                                <Field name="newType" autoComplete="off"></Field>
                                <ErrorMessage name="newType" className="error-style" component="div"></ErrorMessage>

                                <label className="form-label">Pamięć(GB)</label>
                                <Field name="newInterface" autoComplete="off"></Field>
                                <ErrorMessage name="newInterface" className="error-style" component="div"></ErrorMessage>

                                <label className="form-label">Rodzaj pamięci</label>
                                <Field name="newReadSpeed" autoComplete="off"></Field>
                                <ErrorMessage name="newReadSpeed" className="error-style" component="div"></ErrorMessage>

                                <label className="form-label">Wyjścia</label>
                                <Field name="newSaveSpeed" autoComplete="off"></Field>
                                <ErrorMessage name="newSaveSpeed" className="error-style" component="div"></ErrorMessage>

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