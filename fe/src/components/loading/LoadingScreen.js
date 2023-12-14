// LoadingScreen.js

import React, { useState, useEffect } from "react";
import "./LoadingScreen.css";

const LoadingScreen = () => {
  const [fadeText, setFadeText] = useState("3...");

  useEffect(() => {
    const fadeInterval = setInterval(() => {
      if (parseInt(fadeText, 10) > 1) {
        setFadeText(
          (prevText) => (parseInt(prevText, 10) - 1).toString() + "..."
        );
      } else if (parseInt(fadeText, 10) === 1) {
        setFadeText("Start!");
      }
    }, 1000); // Adjust the interval as needed

    return () => clearInterval(fadeInterval);
  }, [fadeText]);

  return (
    <div className="loading-screen">
      <h1 className="fade-text">{fadeText}</h1>
    </div>
  );
};

export default LoadingScreen;
