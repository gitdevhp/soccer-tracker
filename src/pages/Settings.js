import React, {useState} from "react";
import GraphSetting from "../components/GraphSetting";
import Layout from "../components/Layout";
import formType from "../components/GraphSetting";

export var graphCount = 1;

function LocalStorage() {

    const [ide, setide] = useState(0);
    var [dataTemp, setDataTemp] = useState('none');
    var [formatTemp, setFormatTemp] = useState('none');

    let LocalSettings = {
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
    }

    return (
        <>
            <Layout>
                <h3>Graph Settings</h3>
                <div className='graphPresetHolder'>
                    <GraphSetting className='GraphSet' data-id='1'>

                    </GraphSetting>
                </div>
                <button className="addGraph" onClick={() => { addGraphSetting() }}>Add New Graph</button>
                <button className="save" onClick={() => storeGraphs()}>Save</button> {/*change 1st parameter to graph # must be fixed*/}
            </Layout>
        </>
    );
}

export default LocalStorage;