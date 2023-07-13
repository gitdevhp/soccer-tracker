import React, { useState, useRef } from "react"
import Layout from "../components/Layout"
import { Link } from 'react-router-dom';

function Dashboard() {
    const [hasDataGot, setHasDataGot] = useState(false); //use to check if data has loaded
    const snagGridSetting = () => {
        if (localStorage.getItem("preset") !== null) { //gridReq is a setting by the user to show amount of grids, not made yet
            return JSON.parse(localStorage.getItem("preset"));
        }
    };
    const makeGrids = () => {
        const grids = { snagGridSetting };
        if (grids !== 'basePreset'){
            return <h2>No Graph Set Yet, Visit Settings to Customize</h2>
        }
        else if (grids !== null) {
            var indents = [];
            for (var i = 0; i < grids.graphs.length; i++) {
                indents.push(<div className='graph-${i} flexGraph' key={i}>
                    <p>{grids.graphs[i].id}</p>
                    <p>{grids.graphs[i].data}</p>
                    <p>{grids.graphs[i].format}</p>
                </div>);
            }
            return indents;
        } else {
            return (
                <div id="no-grids">
                    <h1>No Grids Requested</h1>
                </div>
            )
        }
    };
    return (
        <>
            <Layout>
                <div id="data-flex">
                    {makeGrids()}
                </div>
                <div id="user-bar">
                    <p id='name'>Hello, User!</p> <p className="text-center">Need to Adjust? <Link to="/settings">Settings</Link></p> <p id='edition'>0.0.1</p>
                </div>
            </Layout>
        </>
    );
}

export default Dashboard;