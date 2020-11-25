import { useHistory, withRouter } from "react-router-dom";
import Bar from "../../componente/bar/bar";
import Goback from "../../componente/goback/goback";
import Nav from "../../componente/nav/nav";

function Clients() {
    const user = JSON.parse(window.localStorage.user);
    const token = window.localStorage.getItem('token');
    const history = useHistory();
   return(<><Nav /><Bar/><Goback history={history}/><center><h1>Aun no tenemos Clientes :'(</h1></center></>);
    
}
export default withRouter(Clients);