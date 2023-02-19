import { createContext, useContext, useEffect, useState } from "react";

const GameContext = createContext({});

export const useGame = () => useContext(GameContext);

const defaultArray = new Array(25).fill({});

const defaultValues = Array.from({ length: 25 }, (_, i) => i + 1);

const defaultPlayerBingoArray = ["B", "I", "N", "G", "O"].map((val) => ({
  value: val,
  selected: false
}));

const defaultComputerBingoArray = ["B", "I", "N", "G", "O"].map((val) => ({
  value: val,
  selected: false
}));

const GameProvider = ({ children }) => {
  const [playerBoard, setPlayerBoard] = useState(defaultArray);
  const [computerBoard, setComputerBoard] = useState(defaultArray);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [values, setValues] = useState(defaultValues);
  const [playerBingo, setPlayerBingo] = useState(defaultPlayerBingoArray);
  const [computerBingo, setComputerBingo] = useState(defaultComputerBingoArray);
  const [loading, setLoading] = useState(true);

  const matchingLines = [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24],
    [0, 5, 10, 15, 20],
    [1, 6, 11, 16, 21],
    [2, 7, 12, 17, 22],
    [3, 8, 13, 18, 23],
    [4, 9, 14, 19, 24],
    [0, 6, 12, 18, 24],
    [4, 8, 12, 16, 20]
  ];

  const getSelectedValue = (arr, index) => {
    const idx = arr.findIndex((a) => a.idx === index);
    return arr[idx].selected;
  };

  const updateBingoStatus = () => {
    const playerLength = getMatchingCount(playerBoard);
    const computerLength = getMatchingCount(computerBoard);
    const playerBingoTemp = [...playerBingo];
    const computerBingoTemp = [...computerBingo];
    for (let i = 0; i < playerLength; i++) {
      playerBingoTemp[i].selected = true;
    }
    for (let i = 0; i < computerLength; i++) {
      computerBingoTemp[i].selected = true;
    }
    setPlayerBingo(playerBingoTemp);
    setComputerBingo(computerBingoTemp);
    if (playerLength === 5) {
      setWinner("Player");
    } else if (computerLength === 5) {
      setWinner("Computer");
    }
  };

  const getMatchingCount = (arr) => {
    const tempArr = matchingLines.filter((line) => {
      const selectedValues = line.map((idx) => getSelectedValue(arr, idx));
      const trueArray = new Array(5).fill(true);
      return (
        JSON.stringify(trueArray.sort()) ===
        JSON.stringify(selectedValues.sort())
      );
    });
    return tempArr.length;
  };

  const shuffle = (squares) => {
    for (let i = squares.length - 1; i > 0; i--) {
      const idx = Math.floor(Math.random() * (i + 1));
      const temp = squares[i];
      squares[i] = squares[idx];
      squares[idx] = temp;
    }
    return squares;
  };

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const updateArray = (arr, value) => {
    const idx = arr.findIndex((a) => a.value === value);
    const newArr = [...arr];
    newArr[idx].selected = true;
    return newArr;
  };

  const makeMove = async (value) => {
    if (!isPlayerTurn) await sleep(3000);
    if (winner) return;
    const newPlayerBoard = updateArray(playerBoard, value);
    const newComputerBoard = updateArray(computerBoard, value);
    setPlayerBoard(newPlayerBoard);
    setComputerBoard(newComputerBoard);
    setValues((pValues) => pValues.filter((pValue) => pValue !== value));
    setIsPlayerTurn(!isPlayerTurn);
    updateBingoStatus();
  };

  const initializeGame = () => {
    setLoading(true);
    const playerSquares = shuffle(
      Array.from({ length: 25 }, (_, i) => i + 1)
    ).map((u, i) => ({
      value: u,
      idx: i,
      selected: false
    }));
    const computerSquares = shuffle(
      Array.from({ length: 25 }, (_, i) => i + 1)
    ).map((u, i) => ({
      value: u,
      idx: i,
      selected: false
    }));
    setPlayerBoard(playerSquares);
    setComputerBoard(computerSquares);
    setLoading(false);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  return (
    <GameContext.Provider
      value={{
        playerBoard,
        computerBoard,
        playerBingo,
        computerBingo,
        isPlayerTurn,
        values,
        makeMove,
        winner
      }}>
      {!loading && children}
    </GameContext.Provider>
  );
};

export default GameProvider;
