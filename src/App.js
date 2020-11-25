import "./App.css";
import Login from "./admin/pages/login/login";
import axios from "axios";
import Dashboard from "./admin/pages/dashboard/dashboard";
import { Redirect, Route, Switch } from "react-router-dom";
import decode from "jwt-decode";
import Profile from "./admin/pages/profile/profile";
import Users from "./admin/pages/users/users";
import UpdateUser from "./admin/pages/users/updateUser";
import NewUser from "./admin/pages/users/newUser";
import orders from "./admin/pages/orders/orders";
import clients from "./admin/pages/clients/clients";
import coupons from "./admin/pages/coupons/coupons";
import items from "./admin/pages/items/items";
import ads from "./admin/pages/ads/ads";
import editItem from "./admin/pages/items/editItem";
//axios.defaults.baseURL = "http://secret-mountain-34847.herokuapp.com/api/beta";
axios.defaults.baseURL = "http://api.localhost/api/beta";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.put["Content-Type"] = "application/json";
axios.defaults.headers.put["Access-Control-Allow-Origin"] = "*";

const isAuth = () => {
  let token = window.localStorage.getItem("token");
  let isValid = true;
  try {
    isValid = decode(token);
  } catch (err) {
    return false;
  }
  return isValid;
};

const MyRoute = (props) => {
  return isAuth() ? <Route {...props} /> : <Redirect to="/" />;
};

const Logout = () => {
  axios.post("/auth/logout", { token: window.localStorage.token });
  window.localStorage.removeItem("token");
  return <Redirect to="/" />;
};

function App() {
  return (
    <>
      <Switch>
        <MyRoute exact path="/ads"  component={ads}/>
        <MyRoute exact path="/items/edit/:id"  component={editItem}/>
        <MyRoute exact path="/items"  component={items}/>
        <MyRoute exact path="/coupons"  component={coupons}/>
        <MyRoute exact path="/clients"  component={clients}/>
        <MyRoute exact path="/orders"  component={orders}/>
        <MyRoute exact path="/settings-users/new"  component={NewUser}/>
        <MyRoute path="/settings-users/:id" component={UpdateUser}/>
        <MyRoute exact path="/settings-users" component={Users} />
        <MyRoute exact path="/profile" component={Profile} />
        <MyRoute exact path="/inicio" component={Dashboard} />
        <Route exact path="/logout" component={Logout} />
        <Route exact path="/" component={Login} />
      </Switch>
    </>
  );
}

export default App;
