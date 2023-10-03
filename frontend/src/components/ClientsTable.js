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

export default function ClientsTable(){

    const [data, setData] = useState([])
    const [editClient, setEditClient]=useState(false);
    const [email, setEmail]=useState()
    const [role, setRole]=useState();
    const [username, setUsername]=useState();
    const [userId, setUserId]=useState();

    useEffect(()=>{
        getData()
    }, []);

    function getData(){
        axios.get("http://localhost:8080/api/v1/other/clients")
        .then(response=>{
            setData(response.data);
        });
    }

    const editClick=(client)=>{
        setEditClient(true);
        setEmail(client.email);
        setRole(client.role);
        setUsername(client.username);
        setUserId(client.id);
    }

    const handleCancelClick=()=>{
        setEditClient(false);
    }

    const initialValues={
        newUsername: username,
        newEmail: email,
        newRole: role
    }

    const handleUpdateClick=(values)=>{
        var user=values.newUsername;
        var userEmail=values.newEmail;
        var request="http://localhost:8080/api/v1/other/update-by-id/"+userId+"/"+user+"/"+userEmail+"/"+role;
        axios.post(request).then(response=>{
            getData();
        })
        setEditClient(false);
    }

    const validationSchema=Yup.object({
        newEmail: Yup.string().
            required('Podaj adres e-mail.')
            .email('Podany adres e-mail jest nieprawidłowy.'),
        newUsername: Yup.string().
            required('Podaj nazwę użytkownika.')
            .min(3, 'Nazwa użytkownika musi składać się z co najmniej 3 znaków.')
            .max(20, 'Nazwa użytkownika musi składać się z maksymalnie 20 znaków.'),
    })

    function changeRole(e){
        setRole(e.target.value);
    }

    const deleteClick=(client)=>{
        setUserId(client.id);
        var request="http://localhost:8080/api/v1/other/delete-by-id/"+userId;
        axios.post(request).then(response=>{
            getData();
        })
    }

    return(
        <div className="table-holder">
            <table className="table">
                <thead className="head">
                    <th className="head-th">ID</th>
                    <th>Nazwa użytownika</th>
                    <th>Adres e-mail</th>
                    <th>Rola</th>
                    <th>Edytuj</th>
                </thead>
                <tbody>
                    {data.map((client, index)=>(
                        <tr key={index}>
                            <td>{client.id}</td>
                            <td>{client.username}</td>
                            <td>{client.email}</td>
                            <td>{client.role}</td>
                            <td>
                                <div className="edit" onClick={()=>editClick(client)}>
                                    <img src={editImg} className="img"></img>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {editClient===true &&
                <div className="background">
                    <div className="form-div">
                        <Formik initialValues={initialValues}  validationSchema={validationSchema} onSubmit={(values)=>{handleUpdateClick(values)}}>
                            <Form className="form">
                                <h1 className="form-headline">Edycja danych użytkownika</h1>
 
                                <label className="form-label">Nazwa użytkownika</label>
                                <Field name="newUsername" autoComplete="off"></Field>
                                <ErrorMessage name="newUsername" component="div" className="error-style"></ErrorMessage>
 
                                <label className="form-label">Adres e-mail</label>
                                <Field name="newEmail" autoComplete="off"></Field>
                                <ErrorMessage name="newEmail" component="div" className="error-style"></ErrorMessage>
 
                                <label className="form-label">Rola</label>
                                <select name="newRole" value={role} onChange={changeRole}>
                                    <option value="USER">USER</option>
                                    <option value="ADMIN">ADMIN</option>
                                </select>
                                <div className="edit-bottom-div">
                                    <button className="edit-button" type="submit">EDYTUJ</button>
                                    <button className="edit-button" onClick={handleCancelClick}>ANULUJ</button>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </div>
            }
        </div>
    )
}