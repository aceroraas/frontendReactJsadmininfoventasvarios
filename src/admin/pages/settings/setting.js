import { Link, withRouter } from "react-router-dom";
import Bar from "../../componente/bar/bar";
import Goback from "../../componente/goback/goback";
import Nav from "../../componente/nav/nav";
import { ReactComponent as Idatabse } from "../../../media/icons/database-solid.svg";
import { ReactComponent as Imoney } from "../../../media/icons/hand-holding-usd-solid.svg";
import { ReactComponent as Ifile } from "../../../media/icons/file-solid.svg";
import "./setting.css";
function Settings() {
  return (
    <>
      <Nav />
      <Bar />
      <Goback />
      <div className="base-sett">
        <div className="subba">
          <div className="ba">
            <Link to="/settings-database">
              <div className="btncard primary text-white">
                <Idatabse />
              </div>
            </Link>
          </div>
          <div className="ba">
            <Link to="/settings-money">
              <div className="btncard primary text-white">
                <Imoney />
              </div>
            </Link>
          </div>

          <div className="ba">
            <Link to="/settings-file">
              <div className="btncard primary text-white">
                <Ifile />
              </div>
            </Link>
          </div>
          
        </div>
      </div>
    </>
  );
}
export default withRouter(Settings);
