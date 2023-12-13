import React from "react";
import "./Landing.css";

function Landing({ handleStartGame }) {
  return (
    <div>
      <h1>Math Mania</h1>
      <button onClick={handleStartGame} className="start-game-btn">
        Start Game
      </button>
    </div>
  );
}

export default Landing;
