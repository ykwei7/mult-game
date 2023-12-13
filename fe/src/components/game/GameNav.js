import React from "react";

function GameNav({ score }) {
  return (
    <div className="game-nav">
      <h3>MathMania</h3>
      <h3 className="score">{String(score).padStart(3, "0")}</h3>
    </div>
  );
}

export default GameNav;
