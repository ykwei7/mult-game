import React, { useEffect, useRef, useState } from "react";
import "./Game.css";
import GameNav from "../../components/game/GameNav";
import GameTimer from "../../components/game/GameTimer";
import { getPairs, modesMapping } from "../../configs/Modes";

function Game({ handleBackNav, gameMode, toggleGameMode }) {
  const [pairs, setPairs] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [currPair, setCurrPair] = useState([]);
  const [score, setScore] = useState(0);
  const [hasGameEnded, setGameEnded] = useState(false);
  const [isWrongAns, setIsWrongAns] = useState(false);
  const inputRef = useRef(null);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const generateAllPairs = () => {
    let pairs = getPairs(gameMode);

    for (let i = pairs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
    }

    return pairs;
  };

  const getNextPair = () => {
    if (pairs?.length <= 1) {
      return;
    }
    const filteredPairs = pairs.slice(1);
    setCurrPair(filteredPairs[0]);
    setPairs(filteredPairs);
  };

  const onSubmit = () => {
    if (inputValue === "") {
      return;
    }

    if (+inputValue === currPair[2]) {
      setScore((prevScore) => prevScore + 1);
      getNextPair();
    } else {
      setIsWrongAns(true);
      setTimeout(() => {
        setIsWrongAns(false);
      }, 500);
    }
    setInputValue("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onSubmit();
    }
  };

  const handleGameEnd = () => {
    setGameEnded(true);
  };

  const handleRestartGame = () => {
    const allPairs = generateAllPairs();
    setPairs(allPairs);
    setCurrPair(allPairs[0]);
    setGameEnded(false);
    setScore(0);
  };

  useEffect(() => {
    if (inputRef?.current) {
      inputRef.current.focus();
    }
    handleRestartGame();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="game-container">
      <GameNav score={score} />
      {hasGameEnded ? (
        <div className="game-end">
          <h3>Game Ended</h3>
          <h4>Final Score: {score}</h4>
          <div className="game-actions">
            <button onClick={handleRestartGame}>Try Again</button>
            <button onClick={toggleGameMode}>
              Mode: {modesMapping[gameMode]}
            </button>
            <button onClick={handleBackNav}>Back</button>
          </div>
        </div>
      ) : (
        <div className="game">
          <GameTimer handleGameEnd={handleGameEnd} />
          <div className="game-pairs">
            {currPair[0]} {currPair[3]} {currPair[1]}
          </div>
          <input
            type="number"
            ref={inputRef}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className={isWrongAns ? "shake-animation" : ""}
          />
          <button className="back-btn" onClick={handleBackNav}>
            Back
          </button>
        </div>
      )}
    </div>
  );
}

export default Game;
