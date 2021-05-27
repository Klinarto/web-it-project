import React, { useState, useEffect } from "react";
import { Time } from "../pages/VendorOrderDetail.style";

const Interval = () => {
  const [seconds, setSeconds] = useState(100);
  var min = 0;
  var sec = 0;

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((seconds) => seconds - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  min = Math.floor(seconds / 60);
  sec = ("0" + (seconds % 60)).slice(-2);

  return (
    <Time>
    
    {min}:{sec}
      
    </Time>
  );
};

export default Interval;
