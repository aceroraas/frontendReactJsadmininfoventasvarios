import { Link, withRouter } from "react-router-dom";
import Bar from "../../componente/bar/bar";
import Goback from "../../componente/goback/goback";
import Nav from "../../componente/nav/nav";
import { ReactComponent as Idatabse } from "../../../media/icons/database-solid.svg";
import { ReactComponent as Imoney } from "../../../media/icons/hand-holding-usd-solid.svg";
import { ReactComponent as Ifile } from "../../../media/icons/file-solid.svg";
import { ReactComponent as Iposition } from "../../../media/icons/briefcase-solid.svg";
import { ReactComponent as Iicons } from "../../../media/icons/icons-solid.svg";
import "./setting.css";
function Settings() {
  return (
    <>
      <Nav />
      <Bar />
      <Goback />
      <div className="base">
        <div className="subba">
          <div className="ba">
            <Link to="/settings-database">
              <div className="btncard primary text-white">
                <Idatabse />
              </div>
            </Link>
                <h6>RESPALDO DEL SISTEMA</h6>
          </div>
          <div className="ba">
            <Link to="/settings-money">
              <div className="btncard primary text-white">
                <Imoney />
              </div>
            </Link>
                <h6>CONFIGURACIÓN DE MONEDA</h6>
          </div>

          <div className="ba">
            <Link to="/settings-file">
              <div className="btncard primary text-white">
                <Ifile /><br/>
              </div>
            </Link>
                <h6>CONFIGURACIÓN DE CATALOGOS</h6>
          </div>
          

          <div className="ba">
            <Link to="/settings-position">
              <div className="btncard primary text-white">
                <Iposition />
              </div>
            </Link>
                <h6>CONFIGURACIÓN DE CARGOS</h6>
          </div>

          {/* <div className="ba">
            <Link to="/settings-icons">
              <div className="btncard primary text-white">
                <Iicons />
              </div>
            </Link>
                <h6>ICONOS DE CATEGORIAS</h6>
          </div> */}

        </div>
      </div>
    </>
  );
}
export default withRouter(Settings);
