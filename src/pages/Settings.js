import React, {useState} from "react";
import GraphSetting from "../components/GraphSetting";
import Layout from "../components/Layout";

export var graphCount = 0;

function LocalStorage() {

    const [graphData, setGraphData] = useState([
        { id: 0, data: "Tackles", format: "Bar" },
    ]);
    const [graphCount, setGraphCount] = useState(1);

    const addGraph = () => {
        setGraphCount(graphCount + 1);
        const newGraph = { id: graphCount, data: "Tackles", format: "Bar" };
        setGraphData([...graphData, newGraph]);
    };

    const removeGraph = (id) => {
        setGraphData(graphData.filter((graph) => graph.id !== id));
        setGraphCount(graphCount - 1);
    };

    const updateGraph = (id, data, format) => {
        const updatedGraph = { id, data, format };
        const index = graphData.findIndex((graph) => graph.id === id); //need help fixing, temp fix but whenever graph setting updated it creates new setting
        if (index === -1) {
            setGraphData([...graphData, updatedGraph]);
        } else {    
            const newGraphData = [...graphData];
            newGraphData[index] = updatedGraph;
            setGraphData(newGraphData);
        }
    };

    const saveGraphs = () => {
        localStorage.setItem('graphData', JSON.stringify(graphData));
    };

    const loadGraphs = () => {
        const data = JSON.parse(localStorage.getItem('graphData'));
        if (data) {
            setGraphData(data);
            setGraphCount(data.length + 1);
        }
    };

    /*let LocalSettings = {
        "graphs": [
            {
                "id": {ide},
                "data": {dataTemp},
                "format": {format},
            },
        ]
    }

    const setGraph = (ID, data, format) => {
        setide(ID);
        setDataTemp(data); //or is it LocalSettings.graphID?
        setFormatTemp(format);
        localStorage.setItem('preset', JSON.stringify({ ...LocalSettings }));
    }

    const storeGraphs = () => {
        for (let i = 0; i < document.querySelectorAll('GraphSet').length; i++) {
            const formatt = document.querySelectorAll('GraphSet')[i].format;
            const datt = document.querySelectorAll('GraphSet')[i].data;
            setGraph(i,formatt,datt);
        }
    }

    const addGraphSetting = () => {
        graphCount++;
        return (
            <>
                <GraphSetting data-id={graphCount}>

                </GraphSetting>
            </>
        )
    }*/

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
                 {/*
                 {[...Array(graphCount)].map((_, index) => (
                 <GraphSetting
                    key={index}
                    id={index}
                    updateGraph={updateGraph}
                    removeGraph={removeGraph}
                 />
                 ))}
                 */}
                <button className="addGraph" onClick={ addGraph }>Add New Graph</button>
                <button className="saveGraphs" onClick={ saveGraphs }>Save Graphs</button>
                <button className="Load" onClick={ loadGraphs }>Load</button> {/*change 1st parameter to graph # must be fixed*/}
            </Layout>
        </>
    );
}

export default LocalStorage;