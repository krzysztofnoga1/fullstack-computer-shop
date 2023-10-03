import React, {useState} from "react";
import { Link } from "react-router-dom";
import '../style/Dropdown.css'

export default function Components(){
    const[components, setComponents] = useState(false);

    return(
        <div>
            <ul className={components ? "dropdown-menu-clicked" : "dropdown-menu"}
                onClick={()=>setComponents(!components)}
            >
                <li>
                    <Link to="/processors">PROCESORY</Link>
                </li>
                <li>
                    <Link to="/graphiccards">KARTY GRAFICZNE</Link>
                </li>
                <li>
                    <Link to="/harddrives">DYSKI TWARDE</Link>
                </li>
                <li>
                <Link to="/motherboards">PŁYTY GŁÓWNE</Link>
                </li>
            </ul>
        </div>
    );
}