import React, { useState } from "react";
import Navbar from "../components/Navbar";
import ClientsTable from "../components/ClientsTable";
import GraphiCardsTable from "../components/GraphicCardsTable";
import ProcessorsTable from "../components/ProcessorsTable";
import HardDrivesTable from "../components/HardDrivesTable";
import MotherBoardsTable from "../components/MotherBoardsTable";
import MousesTable from "../components/MousesTable";
import KeyboardsTable from "../components/KeyboardsTable";
import MonitorsTable from "../components/MonitorsTable";
import HeadsetsTable from "../components/HeadsetsTable";
import OrdersTable from "../components/OrdersTable";
import "../style/Adminpanelstyle.css";

function AdminPanel(){

    const [users, setUsers]=useState(true);
    const [graphicCards, setGraphicCards]=useState(false);
    const [processors, setProcessors]=useState(false);
    const [hardDrives, setHardDrives]=useState(false);
    const [motherBoards, setMotherBoards]=useState(false);
    const [mouses, setMouses]=useState(false);
    const [keyboards, setKeyboards]=useState(false);
    const [monitors, setMonitors]=useState(false);
    const [headSets, setHeadSets]=useState(false);
    const [orders, setOrders]=useState(false);

    const handleUsersClick=()=>{
        setUsers(true);
        setGraphicCards(false);
        setProcessors(false);
        setHardDrives(false);
        setMotherBoards(false);
        setMouses(false);
        setKeyboards(false);
        setMonitors(false);
        setHeadSets(false);
        setOrders(false);
    }

    const handleGraphicCardsClick=()=>{
        setUsers(false);
        setGraphicCards(true);
        setProcessors(false);
        setHardDrives(false);
        setMotherBoards(false);
        setMouses(false);
        setKeyboards(false);
        setMonitors(false);
        setHeadSets(false);
        setOrders(false);
    }

    const handleProcessorsClick=()=>{
        setUsers(false);
        setGraphicCards(false);
        setProcessors(true);
        setHardDrives(false);
        setMotherBoards(false);
        setMouses(false);
        setKeyboards(false);
        setMonitors(false);
        setHeadSets(false);
        setOrders(false);
    }

    const handleHardDrivesClick=()=>{
        setUsers(false);
        setGraphicCards(false);
        setProcessors(false);
        setHardDrives(true);
        setMotherBoards(false);
        setMouses(false);
        setKeyboards(false);
        setMonitors(false);
        setHeadSets(false);
        setOrders(false);
    }

    const handleMotherBoardsClick=()=>{
        setUsers(false);
        setGraphicCards(false);
        setProcessors(false);
        setHardDrives(false);
        setMotherBoards(true);
        setMouses(false);
        setKeyboards(false);
        setMonitors(false);
        setHeadSets(false);
        setOrders(false);
    }

    const handleMousesClick=()=>{
        setUsers(false);
        setGraphicCards(false);
        setProcessors(false);
        setHardDrives(false);
        setMotherBoards(false);
        setMouses(true);
        setKeyboards(false);
        setMonitors(false);
        setHeadSets(false);
        setOrders(false);
    }

    const handleKeyboardsClick=()=>{
        setUsers(false);
        setGraphicCards(false);
        setProcessors(false);
        setHardDrives(false);
        setMotherBoards(false);
        setMouses(false);
        setKeyboards(true);
        setMonitors(false);
        setHeadSets(false);
        setOrders(false);
    }

    const handleMonitorsClick=()=>{
        setUsers(false);
        setGraphicCards(false);
        setProcessors(false);
        setHardDrives(false);
        setMotherBoards(false);
        setMouses(false);
        setKeyboards(false);
        setMonitors(true);
        setHeadSets(false);
        setOrders(false);
    }

    const handleHeadsetsClick=()=>{
        setUsers(false);
        setGraphicCards(false);
        setProcessors(false);
        setHardDrives(false);
        setMotherBoards(false);
        setMouses(false);
        setKeyboards(false);
        setMonitors(false);
        setHeadSets(true);
        setOrders(false);
    }

    const handleOrdersClick=()=>{
        setUsers(false);
        setGraphicCards(false);
        setProcessors(false);
        setHardDrives(false);
        setMotherBoards(false);
        setMouses(false);
        setKeyboards(false);
        setMonitors(false);
        setHeadSets(false);
        setOrders(true);
    }

    return(
        <div className="body">
            <Navbar></Navbar>
            <div className="content-div">
                <div className="sidebar-div">
                    <h1 className="sidebar-headline">PANEL ADMINISTRATORA</h1>
                    <ul className="sidebar-ul">
                        <li className="sidebar-li" onClick={handleUsersClick}>
                            <a className="sidebar-a">UŻYTKOWNICY</a>
                        </li>
                        <li className="sidebar-li" onClick={handleGraphicCardsClick}>
                            <a>KARTY GRAFICZNE</a>
                        </li>
                        <li className="sidebar-li" onClick={handleProcessorsClick}>
                            <a>PROCESORY</a>
                        </li>
                        <li className="sidebar-li" onClick={handleHardDrivesClick}>
                            <a>DYSKI TWARDE</a>
                        </li>
                        <li className="sidebar-li" onClick={handleMotherBoardsClick}>
                            <a>PŁYTY GŁÓWNE</a>
                        </li>
                        <li className="sidebar-li" onClick={handleMousesClick}>
                            <a>MYSZKI</a>
                        </li>
                        <li className="sidebar-li" onClick={handleKeyboardsClick}>
                            <a>KLAWIATURY</a>
                        </li>
                        <li className="sidebar-li" onClick={handleMonitorsClick}>
                            <a>MONITORY</a>
                        </li>
                        <li className="sidebar-li" onClick={handleHeadsetsClick}>
                            <a>SŁUCHAWKI</a>
                        </li>
                        <li className="sidebar-li" onClick={handleOrdersClick}>
                            <a>ZAMÓWIENIA</a>
                        </li>
                    </ul>
                </div>
                {users===true &&
                    <ClientsTable></ClientsTable>
                }
                {graphicCards===true &&
                    <GraphiCardsTable></GraphiCardsTable>
                }
                {processors===true &&
                    <ProcessorsTable></ProcessorsTable>
                }
                {hardDrives===true &&
                    <HardDrivesTable></HardDrivesTable>
                }
                {motherBoards===true &&
                    <MotherBoardsTable></MotherBoardsTable>
                }
                {mouses===true &&
                    <MousesTable></MousesTable>
                }
                {keyboards===true &&
                    <KeyboardsTable></KeyboardsTable>
                }
                {monitors===true &&
                    <MonitorsTable></MonitorsTable>
                }
                {headSets===true &&
                    <HeadsetsTable></HeadsetsTable>
                }
                {orders===true &&
                    <OrdersTable></OrdersTable>
                }
            </div>
        </div>
    )
}

export default AdminPanel;