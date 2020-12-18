import { useHistory, withRouter } from "react-router-dom";
import Bar from "../../componente/bar/bar";
import Goback from "../../componente/goback/goback";
import Nav from "../../componente/nav/nav";
import F404 from "../../componente/404/404";


function Ads() {
//s  const token = window.localStorage.getItem("token");
  const history = useHistory();
  return (
    <>
      <Nav />
      <Bar />
      <Goback history={history} />
      <F404 />
    </>
  );
}
export default withRouter(Ads);
