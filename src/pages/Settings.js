import React, { useRef } from "react";
import GraphSetting from "../components/GraphSetting";
import Layout from "../components/Layout";

var formType = document.getElementById("graphForm").innerHTML;

function LocalStorage() {
    const data = useRef();

    const LocalSettings = {
        graph1: null,
        graph2: null,
        graph3: null,
        graph4: null,
    }

    const setGraph = (graphID, data, format) => {
        const graphSet = {
            data: data,
            format: format,
        }
        LocalSettings[ graphID ] = graphSet; //or is it LocalSettings.graphID?
    }
    localStorage.setItem('GraphSettings', JSON.stringify({...LocalSettings}));
    return (
        <>
            <Layout>
                <input ref={data} />
                <h3>Graph Settings</h3>
                <GraphSetting>

                </GraphSetting>
                <button className="save" onClick={() => setGraph(1,formType)}>Save</button> {/*change 1st parameter to graph # must be fixed*/}
            </Layout>
        </>
    );
}
export default LocalStorage;