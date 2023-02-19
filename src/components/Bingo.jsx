import Square from "./Square";

const Bingo = ({ values, isPlayer }) => {
  return (
    <div className="bingo">
      {values.map((value, idx) => (
        <Square square={value} key={idx} isPlayer={isPlayer} type={"header"} />
      ))}
    </div>
  );
};

export default Bingo;
