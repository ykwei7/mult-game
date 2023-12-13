import React, { useState, useEffect } from "react";

const GameTimer = ({ handleGameEnd }) => {
  const [remainingTime, setRemainingTime] = useState(60);

  useEffect(() => {
    // Set up the interval to update the timer every second
    const timerInterval = setInterval(() => {
      // Update the remaining time
      setRemainingTime((prevTime) => prevTime - 1);

      // Check if the timer has reached 0
      if (remainingTime <= 0) {
        clearInterval(timerInterval);
        handleGameEnd();
        // Perform final actions when the timer is complete
      }
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(timerInterval);
    };
  }, [remainingTime]);

  return (
    <div className="game-timer">{String(remainingTime).padStart(2, "0")}</div>
  );
};

export default GameTimer;
