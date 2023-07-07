import React, { useRef } from "react";
import GraphSetting from "../components/GraphSetting";
import Layout from "../components/Layout";

function LocalStorage(){
    const data=useRef();
    const handleClick=()=>{
        console.log(data.current.value,"init value")
        localStorage.setItem("inputValue",data.current.value)
    }
    console.log(localStorage.getItem("inputValue"),"****")
    return(
        <>
        <Layout>
            <input ref={data} />
            <GraphSetting>

            </GraphSetting>
            <button className="save" onClick={handleClick}>Save</button>
        </Layout>
        </>
    );
}
export default LocalStorage;