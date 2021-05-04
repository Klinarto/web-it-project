import React,{useState, useEffect} from 'react';
import {Time} from "../pages/Order.style";


const Interval = () => {
    const [seconds, setSeconds] = useState(10);
    var min = 0;
    var sec = 0;

    useEffect(() => {
        const interval = setInterval(() => {
        setSeconds(seconds => seconds - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    min = Math.floor(seconds/60);
    sec = ("0" + seconds%60).slice(-2);

    return (
        <Time>
        <header>
            You have {min}:{sec} to
        </header>
        </Time>
    );
};

export default Interval;
