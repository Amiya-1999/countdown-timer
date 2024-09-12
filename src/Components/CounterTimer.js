import React, { useEffect, useRef, useState } from 'react'

function CounterTimer() {

    const [time, setTime] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [isPause, setIsPause] = useState(false);
    const intervalRef = useRef(null);

    useEffect(() => {
        if(isActive && !isPause && time > 0) {
            intervalRef.current = setInterval(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000);
        }
        else if(time === 0) {
            clearInterval(intervalRef.current);
            setIsActive(false);
        }
        return () => clearInterval(intervalRef.current);
    }, [isActive, isPause, time])

    const handleInput = (e) => {
        setTime(parseInt(e.target.value * 60));
    };

    const formatTime = () => {
        const min = String(Math.floor(time/60)).padStart(2,0);
        const sec = String(time - (min*60)).padStart(2,0);
        return (
            <div>{min}:{sec}</div>
        )
    };

    const handleStart = () => {
        setIsActive(true);
        setIsPause(false);
    };

    const handlePause = () => {
        setIsPause(!isPause);
    };

    const handleReset = () => {
        clearInterval(intervalRef.current);
        setIsActive(false);
        setIsPause(false);
        setTime(0);
    };

    return (
        <>
            <div className="countdown-timer">
                <h1>Countdown Timer</h1>
                <div className="timer-display">
                    <input type="number" placeholder='Enter time in minutes' onChange={handleInput} />
                    <div>{formatTime()}</div>
                </div>
                <div className="timer-controls">
                    <button onClick={handleStart} disabled={isActive && !isPause}>Start</button>
                    <button onClick={handlePause} disabled={!isActive}>{!isPause ? 'Pause' : 'Resume'}</button>
                    <button onClick={handleReset}>Reset</button>
                </div>
            </div>
        </>
    )
}

export default CounterTimer