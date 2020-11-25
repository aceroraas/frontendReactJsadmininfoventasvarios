import { useHistory, withRouter } from "react-router-dom";
import Bar from "../../componente/bar/bar";
import Goback from "../../componente/goback/goback";
import Nav from "../../componente/nav/nav";

function Ads() {
  const user = JSON.parse(window.localStorage.user);
  const token = window.localStorage.getItem("token");
  const history = useHistory();
  return (
    <>
      <Nav />
      <Bar />
      <Goback history={history} />
      <center>
        <p>
          debug alert: not yet deployed, main object named "Ads.js", if you
          have already deployed properly, you should not see this message.
        </p>
      </center>
    </>
  );
}
export default withRouter(Ads);
