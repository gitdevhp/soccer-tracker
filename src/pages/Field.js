import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import FieldImg from "../img/field.png";

function Field() {
    var typePass = '';
    var click = 0;

    //drawing line stuff
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [mouseDownX, setMouseDownX] = useState(0);
    const [mouseDownY, setMouseDownY] = useState(0);
    const [mouseUpX, setMouseUpX] = useState(0);
    const [mouseUpY, setMouseUpY] = useState(0);
    
    const [endX, setEndX] = useState(0);
    const [endY, setEndY] = useState(0);
    //time settings
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

    //field dimensions relative to field image
    //subject to change
    const goalAreaX = [200, 270];
    const goalAreaY = [170, 200];

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

    //Data tracking starts here SECTION 2
    // mouse events

    const handleMouseDown = (e) => {
        setIsDrawing(true);
        setMouseDownX(e.clientX);
        setMouseDownY(e.clientY);
        console.log('mouse down');
        console.log(mouseDownX);
        console.log(mouseDownY);
        window.addEventListener('mouseup', handleMouseUp);
    }

    const handleMouseUp = (e) => {
        setIsDrawing(false);
        setMouseUpX(e.clientX);
        setMouseUpY(e.clientY);
        console.log('mouse up')
        console.log(mouseUpX);
        console.log(mouseUpY);
        window.removeEventListener('mouseup', handleMouseUp);
        lineDrawn();
    }

    const handleMouseClick = (e) => {
        setMouseUpX(e.clientX);
        setMouseUpY(e.clientY);
        setMouseDownX(e.clientX);
        setMouseDownY(e.clientY);
        console.log("mouse click");
        click++;
        checkClicks();
    }

    const handleMouseMove = (e) => {
        if (!isDrawing) return;
        setEndX(e.nativeEvent.offsetX);
        setEndY(e.nativeEvent.offsetY);
    }
    //Algorithm for tracking and storing data
    //This is where most change will happen in terms of updates to data Tracked
    
    const lineDrawn = () => {
        if (mouseDownX !== mouseUpX || mouseDownY !== mouseUpY) {
            console.log("line drawn");
            const canvas = canvasRef.current;
            if (!canvas) return;
            const context = canvas.getContext('2d');
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.beginPath();
            context.moveTo(mouseDownX, mouseDownY);
            context.lineTo(mouseUpX, mouseUpY);
            context.stroke();
            const lineLengthX = mouseUpX - mouseDownX;
            const lineLengthY = mouseUpY - mouseDownY;
            const lineLength = Math.sqrt(Math.pow(lineLengthX, 2) + Math.pow(lineLengthY, 2));
            switch (lineLength) {
                case lineLength < 10:
                    typePass = "short";
                    break;
                case lineLength < 30:
                    typePass = "medium";
                    break;
                default:
                    typePass = "long";
            }
            setDataForLine();
        } else {
            checkClicks('misc');
        }
    }

    const setDataForLine = () => {
        if (mouseUpX > goalAreaX[0] &&
            mouseUpX < goalAreaX[1] &&
            mouseUpY > goalAreaY[0] &&
            mouseUpY < goalAreaY[1]) {
            checkClicks('shot', null);
        } else {
            checkClicks('pass', typePass);
        }
    }

    const checkClicks = (t, spec) => {
        window.addEventListener('click', () => click++);
        setTimeout(() => {
            window.removeEventListener('click', () => click++);
            switch (t) {
                case 'pass':
                    if (click === 1) {
                        setNpasses(npasses => npasses + 1);
                    } else {
                        setYpasses(ypasses => ypasses + 1);
                        switch (spec) {
                        case 'short':
                            console.log("short pass");
                            break;
                        case 'medium':
                            console.log("medium pass");
                            break;
                        case 'long':
                            console.log("long pass");
                            break;
                        default:
                            console.log("error pass unassigned");
                        }
                    }
                    break;
                case 'shot':
                    if (click === 1) {
                        setNShots(nshots => nshots + 1);
                    } else {
                        setYShots(yshots => yshots + 1);
                        setScore([score[0] + 1, score[1]]);
                    }
                    break;
                case 'misc':
                    if (click === 1) {
                        setTackles(tackles => tackles + 1);
                    }
                    break;
                default:
                    console.log("error clicks unassigned");
            }
            console.log(t);
        }, 1000);
    }

    return (
        <>
            <Layout>
                <h3>{time}</h3>
                <h3>{score[0]} - {score[1]}</h3>
                <div 
                className="canvas-container"
                onMouseDown={handleMouseDown}
                onMouseClick={handleMouseClick}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                >
                <img src={FieldImg} className="fieldPNG" alt="field"/>
                <canvas 
                    ref={canvasRef}
                    width={FieldImg.width}
                    height={FieldImg.height}
                />
                </div>
                {timerStatus === 0 && (
                    <button onClick={startTimer}>Start</button>
                )} {timerStatus === 1 && (
                    <>
                        <button onClick={stopTimer}>Stop</button>
                        <button onClick={addPass}>Pass</button>
                        <button onClick={addScore}>Goal For</button>
                        <button onClick={addEnemScore}>Goal Against</button>
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
            </Layout>
        </>
    )
};

export default Field;