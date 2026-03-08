import React, { useState } from "react";
import { toggleMute, getIsMuted } from "../../utils/audio";

function GameNav({ score }) {
  const [muted, setMuted] = useState(getIsMuted());

  const handleToggleMute = () => {
    const newMuted = toggleMute();
    setMuted(newMuted);
  };

  return (
    <div className="game-nav">
      <h3>MathMania</h3>
      <div className="nav-right">
        <button className="mute-btn" onClick={handleToggleMute}>
          {muted ? "♪off" : "♪on"}
        </button>
        <h3 className="score">{String(score).padStart(3, "0")}</h3>
      </div>
    </div>
  );
}

export default GameNav;
