import { useState } from "react";
import "./App.css";
import Game from "./views/game/Game";
import Landing from "./views/landing/Landing";
import { modesMapping } from "./configs/Modes";

function App() {
  const [hasGameStarted, setHasGameStarted] = useState(false);
  const [gameMode, setGameMode] = useState(0);
  const durationOptions = [60, 90, 120, 180];
  const [durationIndex, setDurationIndex] = useState(0);
  const gameDuration = durationOptions[durationIndex];
  const toggleDuration = () => {
    setDurationIndex((prev) => (prev + 1) % durationOptions.length);
  };
  const handleStartGame = () => {
    setHasGameStarted(true);
  };
  const handleBackNav = () => {
    setHasGameStarted(false);
  };
  const toggleGameMode = () => {
    setGameMode((prev) => (prev + 1) % Object.keys(modesMapping).length);
  };
  return (
    <div className="app">
      {hasGameStarted ? (
        <Game
          handleBackNav={handleBackNav}
          gameMode={gameMode}
          toggleGameMode={toggleGameMode}
          gameDuration={gameDuration}
        />
      ) : (
        <Landing
          handleStartGame={handleStartGame}
          gameMode={gameMode}
          toggleGameMode={toggleGameMode}
          gameDuration={gameDuration}
          toggleDuration={toggleDuration}
        />
      )}
    </div>
  );
}

export default App;
