import React from "react";
import Navbar from "../components/Navbar";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import "../style/Cartstyle.css"
import { useNavigate } from "react-router-dom";

export default function CartPage(){
    const [id, setId]=useState(localStorage.getItem('id'));
    const [data, setData]=useState([])
    const [count, setCount]=useState([])
    const navigate=useNavigate();

    useEffect(()=>{
        getData();
    }, []);

    function getData(){
        var request="http://localhost:8080/api/v1/other/cart-items-by-client-id/"+id;
        console.log(request)
        axios.get(request)
        .then(response=>{
            setCount(Object.keys(response.data).length);
            setData(response.data);
        });
    }

    const handleDeleteClick=(values)=>{
        var request="http://localhost:8080/api/v1/other/delete-from-cart/"+id+"/"+values.id;
        console.log(request);
        axios.get(request)
        .then(response=>{
            console.log(response.data);
            getData();
        });
    }

    const handleContinueClick=()=>{
        navigate("/address")
    }

    return(
        <div>
            <Navbar></Navbar>
            <div className="products-holder">
                <table>
                    <thead></thead>
                    {data.map((cartitem, index)=>(
                        <div className="cart-product-div">
                            <div>
                                <img src={cartitem.product.img} className="product-img"></img>
                            </div>
                            <div className="info-div">
                            <a>{cartitem.product.name}</a>
                            <a>Cena: {cartitem.totalPrice} zł</a>
                            <a>Ilość: {cartitem.quantity}</a>
                                <div className="button-holder">
                                    <button className="cart-button" onClick={()=>{handleDeleteClick(cartitem)}}>USUŃ</button>
                                </div>
                            </div> 
                        </div>
                    ))}
                </table>
            </div>
            {
                count>0?
                <div className="button-div">
                    <button className="cart-button-2" onClick={handleContinueClick}>DALEJ</button>
                </div>
                :
                <div className="empty-cart-div">
                    <h1 className="empty-cart-msg">TWÓJ KOSZYK JEST PUSTY</h1>
                </div>
            }
        </div>
    )
}