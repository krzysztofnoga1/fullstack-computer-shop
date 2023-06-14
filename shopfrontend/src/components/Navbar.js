import React, {useEffect, useState} from "react";
import Components from "./Components";
import Peripherals from "./Peripherals";
import { BrowserRouter, Route, Link} from "react-router-dom";
import '../style/Navbarstyle.css'
import searchImg from '../img/search.png'
import { useNavigate } from "react-router-dom";

export default function Navbar(){
    const[role, setRole]=useState(localStorage.getItem('role'));
    const[logged, setLogged]=useState(localStorage.getItem('logged'));
    const[components, setComponents] = useState(false);
    const[peripherals, setPeripherals]=useState(false);
    const[search, setSearch]=useState();
    const navigate=useNavigate();

    const handleSearchChange=event=>{
        setSearch(event.target.value);
    }

    const handleLogout=()=>{
        localStorage.clear();
    }

    const handleSearchClick=()=>{
        localStorage.setItem("search", search);
        navigate('/searchresults');
        navigate(0);
    }

    const handleHomeClick=()=>{
        navigate("/");
    }

    return (<nav>
        <a className="site-tile" onClick={handleHomeClick}>POL-KOM</a>
        <div className="search-div">
            <input type="text" placeholder="Czego szukasz?" className="search" onChange={handleSearchChange}></input>
            <div className="search-btn">
                <img src={searchImg} className="image" onClick={handleSearchClick}></img>
            </div>
        </div>
        <ul>
            {logged==="true" &&
                <li>
                    <Link to="/cart">KOSZYK</Link>
                </li>
            }
            <li className="dropdown-li" onMouseEnter={()=>setComponents(true)} 
                onMouseLeave={()=>setComponents(false)}>
                <a>PODZESPOŁY</a>
                {components && <Components/>}
            </li>
            <li className="dropdown-li" onMouseEnter={()=>setPeripherals(true)}
                onMouseLeave={()=>setPeripherals(false)}>
                <a>PERYFERIA</a>
                {peripherals && <Peripherals/>}
            </li>
            {role==="ADMIN" &&
                <li>
                    <Link to="/adminpanel">PANEL ADMINISTARTORA</Link>
                </li>
            }
            {role?
                <li>
                    <Link to="/" onClick={handleLogout}>WYLOGUJ SIĘ</Link>
                </li> :
                <li>
                    <Link to="/login">ZALOGUJ SIĘ</Link>
                </li>
            }
        </ul>
    </nav>);
}