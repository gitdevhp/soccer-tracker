import React, { useState, useEffect } from "react"
import Layout from "../components/Layout"
import { Link } from 'react-router-dom';

function Dashboard() {
    const [graphData, setGraphData] = useState([]);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('graphData'));
        setGraphData(data);
    }, []);

    const makeGrids = ({ graphData }) => {
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
    };
    return (
        <>
            <Layout>
                <div id="data-flex">
                    {makeGrids( graphData )}
                </div>
                <div id="user-bar">
                    <p id='name'>Hello, User!</p> <p className="text-center">Need to Adjust? <Link to="/settings">Settings</Link></p> <p id='edition'>0.0.1</p>
                </div>
            </Layout>
        </>
    );
}

export default Dashboard;