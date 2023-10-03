import React, {useState} from "react";
import { Link } from "react-router-dom";
import '../style/Dropdown.css'

export default function Peripherals(){
    const[peripherals, setPeripherals] = useState(false);

    return(
        <div>
            <ul className={peripherals ? "dropdown-menu-clicked" : "dropdown-menu"}
                onClick={()=>setPeripherals(!peripherals)}
            >
                <li>
                    <Link to="/monitors">MONITORY</Link>
                </li>
                <li>
                    <Link to="/mouses">MYSZKI</Link>
                </li>
                <li>
                    <Link to="/keyboards">KLAWIATURY</Link>
                </li>
                <li>
                    <Link to="/headsets">SŁUCHAWKI</Link>
                </li>
            </ul>
        </div>
    );
}