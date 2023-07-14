import React, { useState, useEffect } from "react";
import GraphSetting from "../components/GraphSetting";
import Layout from "../components/Layout";

function LocalStorage() {

    useEffect(() => {
        if (localStorage.getItem('graphData')===null||localStorage.getItem('graphData')===undefined||localStorage.getItem('graphData')==='undefined'){
             localStorage.setItem('graphData', JSON.stringify([{ id: graphCount, data: "Tackles", format: "Bar" }]));
        } else{
        loadGraphs();
        }
    }, []);

    const [graphCount, setGraphCount] = useState(1);
    const [graphData, setGraphData] = useState([]);

    const addGraph = () => {
        setGraphCount(graphCount + 1);
        const newGraph = { id: graphCount, data: "Tackles", format: "Bar" };
        setGraphData([...graphData, newGraph]);
    };

    const removeGraph = (id) => {
        const newGraphData = graphData.filter((graph) => graph.id !== id);
        setGraphData(newGraphData);
        setGraphCount(newGraphCount => newGraphCount - 1);
        // Update the id numbers of the remaining graphs
        newGraphData.forEach((graph, index) => {
            graph.id = index;
        });
        localStorage.setItem('graphData', JSON.stringify(newGraphData));
    };

    const updateGraph = (id, data, format) => {
        const updatedGraph = { id, data, format };
        const index = graphData.findIndex((graph) => graph.id === id);
        if (index === -1) {
            setGraphData([...graphData, updatedGraph]);
        } else {
            const newGraphData = [...graphData];
            newGraphData[index] = updatedGraph;
            setGraphData(newGraphData);
        }
    };

    const saveGraphs = () => {
        localStorage.setItem('graphPreset', JSON.stringify(graphData));
    };

    const loadGraphs = () => {
        const data = JSON.parse(localStorage.getItem('graphPreset'));
        if (data) {
            setGraphData(data);
            setGraphCount(data.length + 1);
        }
    };

    return (
        <>
            <Layout>
                <h3>Graph Settings</h3>
                {graphData.map((graph) => (
                    <GraphSetting
                        key={graph.id}
                        id={graph.id}
                        data={graph.data}
                        format={graph.format}
                        updateGraph={updateGraph}
                        removeGraph={removeGraph}
                    />
                ))}
                <button className="addGraph" onClick={addGraph}>Add New Graph</button>
                <div className="nav">
                    <p className="text-center" onClick={saveGraphs}><a href="/">Dashboard</a></p>
                </div>
            </Layout>
        </>
    );
}

export default LocalStorage;