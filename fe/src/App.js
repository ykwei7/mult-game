import { useState } from "react";
import "./App.css";
import Game from "./views/game/Game";
import Landing from "./views/landing/Landing";
import { modesMapping } from "./configs/Modes";

function App() {
  const [hasGameStarted, setHasGameStarted] = useState(false);
  const [gameMode, setGameMode] = useState(0);
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
        />
      ) : (
        <Landing
          handleStartGame={handleStartGame}
          gameMode={gameMode}
          toggleGameMode={toggleGameMode}
        />
      )}
    </div>
  );
}

export default App;
