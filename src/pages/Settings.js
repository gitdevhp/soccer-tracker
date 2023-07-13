import React from "react";
import GraphSetting from "../components/GraphSetting";
import Layout from "../components/Layout";
import formType from "../components/GraphSetting";

export var graphCount = 1;

function LocalStorage() {

    const LocalSettings = {
        "graphs": [
            {
                "id": 1,
                "data": "none",
                "format": "none",
            },
        ]
    }

    const setGraph = (ID, data, format) => {
        LocalSettings.graphs[ID].data = data; //or is it LocalSettings.graphID?
        LocalSettings.graphs[ID].format = format;
        localStorage.setItem('preset', JSON.stringify({ ...LocalSettings }));
    }

    const addGraphSetting = () => {
        graphCount++;
        return (
            <>
                <GraphSetting data-id={graphCount}>

                </GraphSetting>
            </>
        )
    }

    return (
        <>
            <Layout>
                <h3>Graph Settings</h3>
                <div className='graphPresetHolder'>
                    <GraphSetting data-id='1'>

                    </GraphSetting>
                </div>
                <button className="addGraph" onClick={() => { addGraphSetting() }}>Add New Graph</button>
                <button className="save" onClick={() => setGraph(0, formType)}>Save</button> {/*change 1st parameter to graph # must be fixed*/}
            </Layout>
        </>
    );
}

export default LocalStorage;