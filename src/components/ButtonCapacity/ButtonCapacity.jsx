import "./ButtonCapacity.css";
import { useDispatch, useSelector } from "react-redux";
import { hitMonster, hitBack } from "../../features/fight/fightSlice";

function ButtonCapacity({ player }) {
  // useDispatch nous permet de dispatcher des actions
  const dispatch = useDispatch();
  const { gameOver } = useSelector((state) => state.fight);
  const fight = () => {
    // Dispatche l'action hitMonster avec une force de 5
    if (player.pv > 0) {
      dispatch(hitMonster({ playerId: player.id, damage: 100 }));
    console.log("🗡️ Attaque lancée !");
    dispatch(hitBack({playerId: player.id}));
    console.log("🗡️ Le monstre riposte !");

   

  }};

  return (
    <button
      type="button"
      onClick={fight}
      disabled={gameOver} 
      className="btn btn-success material-tooltip-main "
    >
      hit
      <i className="fas fa-bomb"></i> 5<i className="fas fa-fire-alt"></i> - 5
    </button>
  );
}

export default ButtonCapacity;
