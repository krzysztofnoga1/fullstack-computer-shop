import React, {useState, useEffect} from "react";
import Navbar from "../components/Navbar";
import "../style/Productpagestyle.css"
import axios from "axios";

export default function KeyboardPage(){
    const [productId, setProductId]=useState(localStorage.getItem('product'))
    const [product, setProduct]=useState([]);
    const [cart, setCart]=useState();
    const [logged, setLogged]=useState(localStorage.getItem('logged'));
    const [unlogged, setUnlogged]=useState(false);
    const [success, setSuccess]=useState(false);

    useEffect(()=>{
        getData();
    }, []);

    function getData(){
        var request="http://localhost:8080/api/v1/other/product-by-id/"+productId;
        axios.get(request)
        .then(response=>{
            console.log(response);
            setProduct(response.data);
            console.log(product);
        });
    }

    const handleAddClick=()=>{
        if(logged==="true"){
            var request="http://localhost:8080/api/v1/other/add-to-cart/"+localStorage.getItem('id')+"/"+product.id;
            axios.get(request)
            .then(response=>{
                setSuccess(true)
            })
        }else{
            setUnlogged(true)
        }
    }

    const handleOkClick=()=>{
        setUnlogged(false);
    }

    const handleOKClick2=()=>{
        setSuccess(false);
    }

    return(
        <div>
            <div className="help-div">
                <div className="main-div">
                    <div className="upper-div">
                        <img src={product.img} className="product-img"></img>
                        <div className="upper-right-div">
                            <a className="product-name">{product.name}</a>
                            <a className="product-price">{product.price} ZŁ</a>
                            <div className="button-holder">
                                <button className="cart-button" onClick={handleAddClick}>DO KOSZYKA</button>
                            </div>
                        </div>
                    </div>
                    <div className="lower-div">
                        <div className="lower-left-div">
                            <a className="spec-a">Łączność: </a>
                            <a className="spec-a">Interfejs: </a>
                            <a className="spec-a">Obsługiwane systemy: </a>
                            <a className="spec-a">Przeznaczenie: </a>
                            <a className="spec-a">Rodzaj przełączników: </a>
                        </div>
                       
                        <div className="lower-right-div">
                            <a className="spec-a-right">{product.spec1}</a>
                            <a className="spec-a-right">{product.spec2}</a>
                            <a className="spec-a-right">{product.spec3}</a>
                            <a className="spec-a-right">{product.spec4}</a>
                            <a className="spec-a-right">{product.spec5}</a>
                        </div>
                    </div>
                </div>
            </div>
            <Navbar></Navbar>
            {
                unlogged===true &&
                <div className="background">
                    <div className="warning-div">
                        <a className="warning-message">ABY DODAĆ PRZEDMIOT DO KOSZYKA MUSISZ SIĘ ZALOGOWAĆ</a>
                        <button className="warning-ok-button" onClick={handleOkClick}>OK</button>
                    </div>    
                </div>
            }
            {
                success===true&&
                <div className="background">
                    <div className="warning-div">
                        <a className="warning-message">DODANO DO KOSZYKA</a>
                        <button className="warning-ok-button" onClick={handleOKClick2}>OK</button>
                    </div>    
                </div>
            }
        </div> 
    )
}