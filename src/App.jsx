import { useEffect } from "react";
import "./App.css";
import Bingo from "./components/Bingo";
import Board from "./components/Board";
import { useGame } from "./context/GameProvider";

function App() {
  const {
    playerBoard,
    computerBoard,
    isPlayerTurn,
    values,
    makeMove,
    playerBingo,
    computerBingo,
    winner
  } = useGame();

  useEffect(() => {
    if (!isPlayerTurn) {
      const randIdx = Math.floor(Math.random() * values.length);
      makeMove(values[randIdx]);
    }
  }, [playerBoard, computerBoard]);

  const headerText = () => {
    if (winner) {
      return `${winner} Won`;
    } else if (isPlayerTurn) {
      return "Player's Turn";
    } else {
      return "Computer's Turn";
    }
  };

  return (
    <>
      <h1>{headerText()}</h1>
      <div className="container">
        <div className="player">
          <Bingo values={playerBingo} isPlayer={true} />
          <Board isPlayer={true} squares={playerBoard} />
        </div>
        <div className="divider"></div>
        <div className="computer">
          <Bingo values={computerBingo} isPlayer={false} />
          <Board isPlayer={false} squares={computerBoard} />
        </div>
      </div>
    </>
  );
}

export default App;
