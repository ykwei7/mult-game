import { useState } from "react";
import "./App.css";
import Game from "./views/game/Game";
import Landing from "./views/landing/Landing";

function App() {
  const [hasGameStarted, setHasGameStarted] = useState(false);
  const handleStartGame = () => {
    setHasGameStarted(true);
  };
  const handleBackNav = () => {
    setHasGameStarted(false);
  };
  return (
    <div className="app">
      {hasGameStarted ? (
        <Game handleBackNav={handleBackNav} />
      ) : (
        <Landing handleStartGame={handleStartGame} />
      )}
    </div>
  );
}

export default App;
