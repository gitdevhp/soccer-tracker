import React, {useState} from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";

function Summary() {
    const [gameData, setGameData] = useState(JSON.parse(localStorage.getItem('saveGame')));
    return (
        <>
            <Layout>
                <h3>Summary</h3>
                <pre>{JSON.stringify(gameData, null, 2)}</pre>
                <Link to="/">Home</Link>
            </Layout>
        </>
    )
};

export default Summary;