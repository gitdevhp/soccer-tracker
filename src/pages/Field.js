import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import FieldImg from "../img/field.png";

function Field() {

    let adjTime = "00:10";

    const [interv, setInterv] = useState();
    const [timerStatus, setTimerStatus] = useState(0);
    // 0 = not started
    // 1 = running
    // 2 = paused

    const [time, setTime] = useState("00:00");
    const [score, setScore] = useState([0, 0]);
    const [half, setHalf] = useState(1);

    const [holdMin, setHoldMin] = useState(0);
    const [holdSec, setHoldSec] = useState(0);

    const [sec, setSec] = useState(0);
    const [min, setMin] = useState(0);
    const [Ypasses, setYpasses] = useState(0);
    const [Npasses, setNpasses] = useState(0);
    const [Yshots, setYShots] = useState(0);
    const [Nshots, setNShots] = useState(0);
    const [tackles, setTackles] = useState(0);

    const [mouseDown, setMouseDown] = useState([0, 0]);
    const [mouseUp, setMouseUp] = useState([0, 0]);

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
        console.log("reset Timer");
    }

    var updatedSec = sec, updatedMin = min;

    const runTimer = () => {
        updatedSec++;
        if (updatedSec === 60) {
            updatedMin++;
            updatedSec = 0;
        }
        setTime(`${updatedMin.toString().padStart(2, '0')}:${updatedSec.toString().padStart(2, '0')}`);
        setHoldMin(updatedMin);
        setHoldSec(updatedSec);
    }

    const halfEnd = async () => {
        saveHalf(half);
        setHalf(half => half + 1);
    };

    const saveHalf = (half) => {
        if (half === 1) {
            const half1Stats = {
                time: time,
                Passes: [{ Complete: Ypasses, Miss: Npasses }],
                Shots: [{ Complete: Yshots, Miss: Nshots }],
                Tackles: tackles,
            }
            const h1 = { ...half1Stats };
            localStorage.setItem('saveGame', JSON.stringify([h1]));
        } else {
            const adjTimeMin = holdMin - parseInt(JSON.parse(localStorage.getItem('saveGame'))[0].time.split(':')[0]);
            const adjTimeSec = holdSec - parseInt(JSON.parse(localStorage.getItem('saveGame'))[0].time.split(':')[1]);
            console.log(adjTimeMin, adjTimeSec);
            adjTime = `${adjTimeMin.toString().padStart(2, '0')}:${adjTimeSec.toString().padStart(2, '0')}`;
            const halfStats = {
                time: adjTime,
                Passes: [{ Complete: Ypasses, Miss: Npasses }],
                Shots: [{ Complete: Yshots, Miss: Nshots }],
                Tackles: tackles,
            }
            const scorePP = {
                score: `${score[0]} - ${score[1]}`,
            }

            const h2 = { ...halfStats, ...scorePP };
            var h1Stats = JSON.parse(localStorage.getItem('saveGame'));
            localStorage.setItem('saveGame', JSON.stringify(h1Stats.concat(h2)));
        }
        resetStats();
    };

    const addPass = () => {
        setYpasses(ypasses => ypasses + 1);
    };

    const addScore = () => {
        setYShots(yshots => yshots + 1);
        setScore([score[0] + 1, score[1]]);
    }

    const addEnemScore = () => {
        setScore([score[0], score[1] + 1]);
    }

    // mouse events

    const handleMouseDown = (e) => {
        setMouseDown(e.clientX, e.clientY);
    }

    const handleMouseUp = (e) => {
        setMouseUp(e.clientX, e.clientY);
        lineDrawn();
    }

    const handleMouseClick = (e) => {

    }

    const lineDrawn = () => {
        if (mouseDown[0] !== mouseUp[0] && mouseDown[1] !== mouseUp[1]) {
            console.log("line drawn");
            const lineLengthX = mouseUp[0] - mouseDown[0];
            const lineLengthY = mouseUp[1] - mouseDown[1];
            const lineLength = Math.sqrt(Math.pow(lineLengthX, 2) + Math.pow(lineLengthY, 2));
            var typePass;
            switch (lineLength) {
                case lineLength < 10:
                    typePass = "short pass";
                    break;
                case lineLength < 30:
                    typePass = "medium pass";
                    break;
                default:
                    typePass = "long pass";
            }
            setDataForPass(typePass);
        } else {
            console.log("line not drawn");
        }
    }

    const setDataForPass = (typePass) => {

    }

    return (
        <>
            <Layout>
                <h3>{time}</h3>
                <h3>{score[0]} - {score[1]}</h3>
                <img src={FieldImg} className="fieldPNG" alt="field"
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    onMouseOut={handleMouseUp}
                    onMouseClick={handleMouseClick}

                />
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
                <button onClick={addScore}>Goal For</button>
                <button onClick={addEnemScore}>Goal Against</button>
            </Layout>
        </>
    )
};

export default Field;