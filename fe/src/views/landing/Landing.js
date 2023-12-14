import React from "react";
import "./Landing.css";
import { modesMapping } from "../../configs/Modes";

function Landing({ handleStartGame, gameMode, toggleGameMode }) {
  return (
    <div className="landing-page">
      <h1>Math Mania</h1>
      <button onClick={handleStartGame} className="expanding-btn">
        Start Game
      </button>
      <button onClick={toggleGameMode} className="expanding-btn">
        Mode: {modesMapping[gameMode]}
      </button>
    </div>
  );
}

export default Landing;
