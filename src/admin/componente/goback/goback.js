import "./goback.css";
import { ReactComponent as Iback } from "../../../media/icons/caret-right-solid.svg";
import { Link } from "react-router-dom";

function Goback({ history }) {
  function goback() {
    history.goBack();
  }
  return (
    <div className="base-goback">
      <Link to="#back" onClick={goback}>
        <Iback />
        Atras
      </Link>
      <hr />
    </div>
  );
}
export default Goback;
