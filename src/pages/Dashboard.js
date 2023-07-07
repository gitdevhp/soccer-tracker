import React, { useState, useRef } from "react"
import Layout from "../components/Layout"
import { BrowserRouter as Link } from 'react-router-dom';

function Dashboard() {
    const [hasDataGot, setHasDataGot] = useState(false); //use to check if data has loaded
    const gridCount = () => {
        if (localStorage.getItem("gridReq") !== null) { //gridReq is a setting by the user to show amount of grids, not made yet
            return JSON.parse(localStorage.getItem("gridReq"));
        }
    };
    const makeGrids = () => {
        const grids = { gridCount };
        if (grids > 0) {
            var indents = [];
            for (var i = 0; i < grids; i++) {
                indents.push(<div className='graph-${i} flexGraph' key={i}></div>);
            }
            return indents;
        } else {
            return (
                <div id="no-grids">
                    <h1>No Grids Requested</h1>
                    <p>You have not requested any grids yet, go to settings and customize</p>
                </div>
            )
        }
    };
    return (
        <>
            <Layout>
                <div id="data-flex">
                    {makeGrids}
                </div>
                <div id="user-bar">
                    <p id='name'>Hello, User!</p> <p className="text-center">Need to Adjust? <Link to="/settings">Settings</Link></p> <p id='edition'>0.0.1</p>
                </div>
            </Layout>
        </>
    );
}

export default Dashboard;