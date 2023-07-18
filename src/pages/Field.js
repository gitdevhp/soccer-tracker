import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
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

    useEffect(() => {
        let seconds = Math.floor(time / 1000);
        let minutes = Math.floor(seconds / 60);
        seconds = seconds % 60;
        let displaySeconds = seconds < 10 ? `0${seconds}` : seconds;
        let displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
        setTime(`${displayMinutes}:${displaySeconds}`);
    }, [time]);

    const startTimer = () => {
        setIsRunning(true);
        const startTime = Date.now() - time;
        const interval = setInterval(() => {
            setTime(Date.now() - startTime);
        }, 1000);
        Ref.current = interval;
    };

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
            const h1 = { ...halfStats };
            setGameStats([h1, gameStats[1]]);
            resetStats();
        } else {
            const h2 = { ...halfStats };
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
                {isRunning ? (
                    <button onClick={addPass}>Pass</button>
                ) : (
                    null
                )}
            </Layout>
        </>
    )
};

export default Field;