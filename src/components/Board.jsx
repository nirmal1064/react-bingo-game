import Square from "./Square";

const Board = ({ isPlayer, squares }) => {
  return (
    <div className="board">
      {squares.map((square, idx) => (
        <Square key={idx} square={square} isPlayer={isPlayer} type={"number"} />
      ))}
    </div>
  );
};

export default Board;
