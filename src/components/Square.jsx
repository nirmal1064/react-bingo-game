import { useGame } from "../context/GameProvider";

const Square = ({ isPlayer, square, type }) => {
  const { makeMove, isPlayerTurn, values } = useGame();
  const className = "square"
    .concat(square.selected ? " selected" : "")
    .concat(isPlayer || type === "header" ? "" : " computer");

  const handleClick = () => {
    if (!isPlayer) return;
    if (!isPlayerTurn) {
      alert("Not Your Turn");
      return;
    }
    if (!values.includes(square.value)) return;
    makeMove(square.value);
  };

  return (
    <div className={className} onClick={handleClick}>
      {square.value}
    </div>
  );
};

export default Square;
