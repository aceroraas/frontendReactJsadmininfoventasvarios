import { useHistory, withRouter } from "react-router-dom";
import F404 from "../../componente/404/404";
import Bar from "../../componente/bar/bar";
import Goback from "../../componente/goback/goback";
import Nav from "../../componente/nav/nav";

function Coupons() {
    //const user = JSON.parse(window.localStorage.user);
    //const token = window.localStorage.getItem('token');
    const history = useHistory();
   return(<><Nav /><Bar/><Goback history={history}/><F404 /></>);
    
}
export default withRouter(Coupons);