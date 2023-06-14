import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import "../style/Afterorderstyle.css"

export default function AfterOrderPage(){
    const [orderId, setOrderId]=useState(localStorage.getItem('order'));
    const [data, setData]=useState([]);

    useEffect(()=>{
        getData();
    }, []);

    function getData(){
        var request="http://localhost:8080/api/v1/other/get-order-by-id/"+orderId;
        axios.get(request)
        .then(response=>{
            console.log(response.data);
            setData(response.data);
        });
    }

    return(
        <div>
            <Navbar></Navbar>
            <h1>Dziękujemy za zakupy w naszym sklepie</h1>
            <div className="details-div">
                <h className="details-h">Szczegóły zamówienia</h>
                <a className="details-a">Zakupiione produkty:</a>
                <a>{data.items}</a>
                <a className="details-a">Cena:</a>
                <a>{data.totalPrice} zł</a>
                <a className="details-a">Dane adresowe</a>
                <a>{data.name} {data.surname}</a>
                <a>{data.address}</a>
                <a>{data.postalCode} {data.city}</a>
            </div>
        </div>
    )
}