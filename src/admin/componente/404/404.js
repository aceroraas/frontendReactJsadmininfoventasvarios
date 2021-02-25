import { Link, useHistory } from "react-router-dom";
import { ReactComponent as I404 } from "../../../media/icons/undraw_launch_day_404.svg";
import "./F404.css";
export default function F404() {
  const history = useHistory();
  return (
    <>
      <div className="F404">
        <I404 />
        <br />
        <h2>UPS.. NOS HEMOS PERDIDO</h2>
        <br />
        <Link
          className="btn secundary text-white"
          onClick={(e) => {
            history.push("/");
          }}
        >
          SACAME DE AQUI
        </Link>
      </div>
    </>
  );
}
