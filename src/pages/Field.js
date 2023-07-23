import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";

function Field() {
    const [interv, setInterv] = useState();
    const [timerStatus, setTimerStatus] = useState(0);
    // 0 = not started
    // 1 = running
    // 2 = paused

    const [time, setTime] = useState("00:00");
    const [half, setHalf] = useState(1);

    const [sec, setSec] = useState(0);
    const [min, setMin] = useState(0);

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
        resetTimer();
        resetStats();
    }, []);

    // time updates

    const startTimer = () => {
        setTimerStatus(1);
        setInterv(setInterval(runTimer, 1000));
    }

    const resumeTimer = () => startTimer();

    const stopTimer = () => {
        clearInterval(interv);
        setTimerStatus(2);
    }

    const resetTimer = () => {
        clearInterval(interv);
        setTimerStatus(0);
        setTime("00:00");
        setSec(0);
        setMin(0);
        setHalf(1);
    }

    var updatedSec = sec, updatedMin = min;
    const runTimer = () => {
        updatedSec++;
        if (updatedSec === 60) {
            updatedMin++;
            updatedSec = 0;
        }
        setTime(`${updatedMin.toString().padStart(2, '0')}:${updatedSec.toString().padStart(2, '0')}`);
    }

    const halfEnd = async () => {
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
            localStorage.setItem('saveGame', JSON.stringify([h1]));
        } else {
            const adjTimeMin = updatedMin - parseInt(JSON.parse(localStorage.getItem('saveGame'))[0].time.split(':')[0]);
            console.log(JSON.parse(localStorage.getItem('saveGame'))[0].time.split(':')[1]);
            const adjTimeSec = updatedSec - parseInt(JSON.parse(localStorage.getItem('saveGame'))[0].time.split(':')[1]);
            const adjTime = `${adjTimeMin.toString().padStart(2, '0')}:${adjTimeSec.toString().padStart(2, '0')}`;
            setTime(adjTime);
            const h2 = { ...halfStats };
            var h1Stats = JSON.parse(localStorage.getItem('saveGame'));
            localStorage.setItem('saveGame', JSON.stringify(h1Stats.concat(h2)));
        }
        resetStats();
    };

    const addPass = () => {
        setYpasses(ypasses => ypasses + 1);
    };

    return (
        <>
            <Layout>
                <h3>{time}</h3>
                {timerStatus === 0 && (
                    <button onClick={startTimer}>Start</button>
                )} {timerStatus === 1 && (
                    <>
                        <button onClick={stopTimer}>Stop</button>
                    </>
                )} {timerStatus === 2 && (
                    <>
                        <button onClick={resumeTimer}>Resume</button>
                    </>
                )}
                {half === 1 && timerStatus !== 0 && (
                    <button onClick={halfEnd}>Half End</button>
                )} {half === 2 && (
                    <button onClick={halfEnd}><Link to="/summary">End Game</Link></button>
                )}
                <button onClick={addPass}>Pass</button>
            </Layout>
        </>
    )
};

export default Field;