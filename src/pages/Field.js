import React, { useRef, useState, useEffect } from "react";
import { Link, redirect } from "react-router-dom";
import Layout from "../components/Layout";

function Field() {
    const Ref = useRef(null);
    const [isRunning, setIsRunning] = useState(false);
    const [time, setTime] = useState("00:00");
    const [half, setHalf] = useState(1);

    const [gameStats, setGameStats] = useState([]);

    const [Ypasses, setYpasses] = useState(0);
    const [Npasses, setNpasses] = useState(0);

    const [Yshots, setYShots] = useState(0);
    const [Nshots, setNShots] = useState(0);

    const [tackles, setTackles] = useState(0);

    const resetStats = () => {
        setYpasses(0);
        setNpasses(0);
        setYShots(0);
        setNShots(0);
        setTackles(0);
    }

    useEffect(() => {
        setTime("00:00");
        setHalf(1);

        resetStats();
    }, []);

    const startTimer = () => {
        setIsRunning(true);
        let seconds = 0;
        let minutes = 0;
        Ref.current = setInterval(() => {
            seconds++;
            if (seconds === 60) {
                seconds = 0;
                minutes++;
            }
            setTime(`${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`);
        }, 1000);
    };

    const stats = Object.freeze({
        time: '',
        Passes: [{ Complete: 0, Miss: 0 }],
        Shots: [{ Complete: 0, Miss: 0 }],
        Tackles: 0,
    });

    const halfEnd = () => {
        saveHalf(half);
        setHalf(half => half + 1);
    };

    const saveHalf = (half) => {
        const halfStats = {
            time: time,
            Passes: [{ Complete: Ypasses, Miss: Npasses }],
            Shots: [{ Complete: Yshots, Miss: Nshots }],
            Tackles: tackles,
        }

        if (half === 1) {
             const h1 = { ...stats, ...halfStats };
            setGameStats([h1, gameStats[1]]);
            resetStats();
        } else {
            const h2 = { ...stats, ...halfStats};
            setGameStats([gameStats[0], h2]);
            resetStats();
            localStorage.setItem('saveGame', JSON.stringify(gameStats));
        }
    };

    const addPass = () => {
        setYpasses(ypasses => ypasses + 1);
    };

    return (
        <>
            <Layout>
                <h3>{time}</h3>
                {!isRunning ? (
                    <button onClick={startTimer}>Start</button>
                ) : (
                    <button onClick={() => { clearInterval(Ref.current); setIsRunning(false) }}>Stop</button>
                )}
                {half === 1 ? (
                    <button onClick={halfEnd}>Half</button>
                ) : (
                    <button onClick={halfEnd}><Link to="/summary">End Game</Link></button>
                )}
                <button onClick={addPass}>Pass</button>
            </Layout>
        </>
    )
};
export default Field;