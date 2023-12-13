import React, { useEffect, useRef, useState } from "react";
import "./Game.css";
import GameNav from "../../components/game/GameNav";
import GameTimer from "../../components/game/GameTimer";

function Game({ handleBackNav }) {
  const LOWER_BOUND = 0;
  const UPPER_BOUND = 12;

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
    let pairs = [];

    for (let i = LOWER_BOUND; i <= UPPER_BOUND; i++) {
      for (let j = LOWER_BOUND; j <= UPPER_BOUND; j++) {
        pairs.push([i, j]);
      }
    }

    for (let i = pairs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
    }

    return pairs;
  };

  const getNextPair = () => {
    if (pairs?.length <= 1) {
      alert("yay");
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

    if (+inputValue === currPair[0] * currPair[1]) {
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
            <button onClick={handleBackNav}>Back</button>
          </div>
        </div>
      ) : (
        <div className="game">
          <GameTimer handleGameEnd={handleGameEnd} />
          <div className="game-pairs">
            {currPair[0]} x {currPair[1]}
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
