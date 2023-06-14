import React from "react";
import Navbar from "../components/Navbar";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import "../style/Productsstyle.css";
import "../style/Resultsstyle.css"
import { useNavigate } from "react-router-dom";

export default function SearchResults(){
    const [search, setSearch]=useState(localStorage.getItem('search'));
    const [data, setData]=useState([]);
    const navigate=useNavigate();

    useEffect(()=>{
        getData();
    }, []);

    function getData(){
        var request="http://localhost:8080/api/v1/other/search-products/"+search;
        axios.get(request)
        .then(response=>{
            setData(response.data);
            console.log(response);
        });
    }

    const handleProductClick=(value)=>{
        localStorage.setItem('product', value.id);
        switch(value.category.id){
            case 1:
                navigate('/card');
                break;
            case 2:
                navigate('/processor')
                break;
            case 3:
                navigate('/harddrive')
                break;
            case 4:
                navigate('/motherboard')
                break;
            case 5:
                navigate('/mouse')
                break;
            case 6:
                navigate('/keyboard')
                break;
            case 7:
                navigate('/monitor')
                break;
            case 8:
                navigate('/headset')
                break;
        }
    }

    return(
        <div>
            <Navbar></Navbar>
            {data.length>0?
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
                </div>:
                <h1 className="no-results-msg">NIE ZNALEZIONO PRODUKTÓW</h1>
            }
            
        </div>
    )
}