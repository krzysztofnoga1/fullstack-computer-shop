import React from "react";
import Navbar from "../components/Navbar";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import "../style/Productsstyle.css"
import { useNavigate } from "react-router-dom";

export default function Monitors(){

    const [data, setData]=useState([]);
    const navigate=useNavigate();

    useEffect(()=>{
        getData();
    }, []);

    function getData(){
        var request="http://localhost:8080/api/v1/other/products-by-category/7";
        axios.get(request)
        .then(response=>{
            setData(response.data);
        });
    }

    const handleProductClick=(value)=>{
        localStorage.setItem('product', value.id)
        navigate('/monitor');
    }

    return(
        <div>
            <Navbar></Navbar>
            <div className="products-holder">
                <table>
                    <thead></thead>
                    <tbody>
                        {data.map((product, index)=>(
                            <div className="product-div" onClick={()=>{handleProductClick(product)}}>
                                <img src={product.img} className="product-img"></img>
                                <div className="right-div">
                                    <a className="product-name">{product.name}</a>
                                    <a className="product-price">{product.price} zł</a>
                                </div>
                            </div>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}