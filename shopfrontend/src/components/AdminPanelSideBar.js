import React from "react";
import "../style/Adminpanelstyle.css";

export default function AdminPanelSideBar(){

    return(
        <div className="sidebar-div">
            <h1 className="sidebar-headline">PANEL ADMINISTRATORA</h1>
            <ul className="sidebar-ul">
                <li className="sidebar-li">
                    <a className="sidebar-a">UŻYTKOWNICY</a>
                </li>
                <li className="sidebar-li">
                    <a>KARTY GRAFICZNE</a>
                </li>
                <li className="sidebar-li">
                    <a>PROCESORY</a>
                </li>
                <li className="sidebar-li">
                    <a>DYSKI TWARDE</a>
                </li>
                <li className="sidebar-li">
                    <a>PŁYTY GŁÓWNE</a>
                </li>
                <li className="sidebar-li">
                    <a>MYSZKI</a>
                </li>
                <li className="sidebar-li">
                    <a>KLAWIATURY</a>
                </li>
                <li className="sidebar-li">
                    <a>MONITORY</a>
                </li>
                <li className="sidebar-li">
                    <a>SŁUCHAWKI</a>
                </li>
            </ul>
        </div>
    )
}