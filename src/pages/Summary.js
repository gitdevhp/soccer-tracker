import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";

function Summary() {
    const [gameData, setGameData] = useState(JSON.parse(localStorage.getItem('saveGame')));
    return (
        <>
            <Layout>
                <h3>Summary</h3>
                <h3>Score: {gameData[1].score}</h3>
                <div className="holdHalves">
                    <div className="hdis">
                        <h3>Half 1</h3>
                        <h4>Time: {gameData[0].time}</h4>
                        <h5>
                            Passes:{" "}
                            <span className="Complete">{gameData[0].Passes[0].Complete}</span> -{" "}
                            <span className="Miss">{gameData[0].Passes[0].Miss}</span>
                        </h5>
                        <h5>
                            Shots:{" "}
                            <span className="Complete">{gameData[0].Shots[0].Complete}</span> -{" "}
                            <span className="Miss">{gameData[0].Shots[0].Miss}</span>
                        </h5>
                        <h5>
                            Tackles: {gameData[0].Tackles}
                        </h5>
                    </div>
                    <div className="hdis">
                        <h3>Half 2</h3>
                        <h4>Time: {gameData[1].time}</h4>
                        <h5>
                            Passes:{" "}
                            <span className="Complete">{gameData[1].Passes[0].Complete}</span> -{" "}
                            <span className="Miss">{gameData[1].Passes[0].Miss}</span>
                        </h5>
                        <h5>
                            Shots:{" "}
                            <span className="Complete">{gameData[1].Shots[0].Complete}</span> -{" "}
                            <span className="Miss">{gameData[1].Shots[0].Miss}</span>
                        </h5>
                        <h5>
                            Tackles: {gameData[1].Tackles}
                        </h5>
                    </div>
                </div>
                <Link to="/">Home</Link>
            </Layout>
        </>
    )
};

export default Summary;