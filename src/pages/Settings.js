import React, { useState, useEffect } from "react";
import GraphSetting from "../components/GraphSetting";
import Layout from "../components/Layout";

function LocalStorage() {

    const [graphCount, setGraphCount] = useState(0);
    const [graphData, setGraphData] = useState([]);


    useEffect(() => {
        if (
            localStorage.getItem('graphPreset') === null ||
            localStorage.getItem('graphPreset') === undefined ||
            localStorage.getItem('graphPreset') === 'undefined'
        ) {
            localStorage.setItem(
                'graphPreset',
                JSON.stringify([{ id: graphCount, data: "Tackles", format: "Bar" }]));
                console.log('no preset')
                loadGraphs();
        } else {
            loadGraphs();
            console.log(graphCount);
        console.log(graphData);
        console.log(localStorage.getItem('graphPreset'));
        }
    }, []);

    const addGraph = () => {
        setGraphCount(graphCount => graphCount + 1);
        const newGraph = { id: graphCount, data: "Tackles", format: "Bar" };
        setGraphData(prevGraphData => [...prevGraphData, newGraph]);
        saveGraphs();
    };

    const removeGraph = (id) => {
        console.log(id);
        const graphIndex = graphData.findIndex((graph) => graph.id === id);
        console.log(graphIndex);
        if (graphIndex !== -1) {
            const newGraphData = [...graphData];
            console.log(newGraphData.splice(graphIndex, 1));
            setGraphData(newGraphData);
            setGraphCount(newGraphData.length);
            newGraphData.forEach((graph, index) => {
                graph.id = index;
            });
            
            saveGraphs();
            loadGraphs();
        }
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
        saveGraphs();
    };

    const saveGraphs = () => {
        localStorage.setItem('graphPreset', JSON.stringify(graphData));
    };

    const loadGraphs = async() => {
        console.log('loading graphs');
        const data = localStorage.getItem('graphPreset');
        if (!data) {
            console.log('no data');
            return;
        } 
        let parsedData = JSON.parse(data);
        console.log("parsed data: ", parsedData);
            setGraphData(parsedData);
            setGraphCount(parsedData.length);
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