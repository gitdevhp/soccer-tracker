import React, { useState, useEffect } from "react"
import Layout from "../components/Layout"
import { Link } from 'react-router-dom';
import SettingsLogo from "../img/settings.png";

function Dashboard() {
    const [graphData, setGraphData] = useState([]);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('graphPreset'));
        setGraphData(data);
    }, []);

    const makeGrids = () => {
        console.log(graphData);
        if (graphData !== null) {
            return (
                <div>
                    {graphData.map((graph) => (
                        <div key={graph.id}>
                            <h3>Graph {graph.id + 1}</h3>
                            <p>Data: {graph.data}</p>
                            <p>Format: {graph.format}</p>
                        </div>
                    ))}
                </div>
            );
        }
    };

    return (
        <>
            <Layout>
                <h3>Dashboard</h3>
                <div className="top-user-bar">
                    <p id='name'>Hello, User!</p> <Link to="/settings"><img src={SettingsLogo} className="settingPNG" alt="Settings"/></Link>
                </div>
                <div id="data-flex">
                    {makeGrids()}
                </div>
                <div id="user-bar">
                    <p><Link to="/field">Play</Link></p> <p id='edition'>0.0.1</p>
                </div>
            </Layout>
        </>
    );
}

export default Dashboard;