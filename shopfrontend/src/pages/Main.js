import React from "react";
import Navbar from "../components/Navbar";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import "../style/Mainstyle.css"
import { useNavigate } from "react-router-dom";

export default function Main(){

    const navigate=useNavigate();
    const [data, setData]=useState([]);

    useEffect(()=>{
        getData();
    }, []);

    function getData(){
        var request="http://localhost:8080/api/v1/other/get-newest";
        axios.get(request)
        .then(response=>{
            console.log(response.data);
            setData(response.data);
        });
    }

    const handleProductClick=(value)=>{
        localStorage.setItem('product', value[0]);
        switch(value[4]){
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
            <h1 className="headline-main">POLECANE PRODUKTY</h1>
            <div className="holder-div">
                {data.map((object)=>(
                    <div className="product-div" onClick={()=>{handleProductClick(object)}}>
                        <img src={object[3]} className="p-image"></img>
                        <a className="product-name">{object[1]}</a>
                        <a>{object[2]} zł</a>
                    </div>
                ))}
            </div>
        </div>
    )
}