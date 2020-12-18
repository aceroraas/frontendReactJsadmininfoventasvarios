import React from "react";
import { Link, useHistory, withRouter } from "react-router-dom";
import { ReactComponent as Iusuario } from "../../../media/icons/user-astronaut-solid.svg";
import Bar from "../../componente/bar/bar";
import Goback from "../../componente/goback/goback";
import Nav from "../../componente/nav/nav";
import "./profile.css";

function Profile() {
  let user = JSON.parse(window.localStorage.user);
  const history = useHistory();

  return (
    <>
      <Nav />
      <Bar />
      <div className="base-profile">
      <Goback history={history} />
        <div className="base-profile-data">
          <div className="profile-h3">
            <h3>{`${user.first_name.toUpperCase()} ${user.second_name.toUpperCase()}`}</h3>
            <h3>{`${user.national_id}`}</h3>
          </div>
          <div className="profile-input">
            <h3>{user.email} </h3>
            <h3>{user.number_phone}</h3>
          </div>
        </div>
        <div className="base-profile-img">
          <div className="img-background">
            <div className="img">
              <Iusuario />
            </div>
          </div>
        </div>
        <div className="base-profile-btn">
          <Link to={`/settings-users/${user.id}`}>ACTUALIZAR</Link>
        </div>
      </div>
    </>
  );
}

export default withRouter(Profile);
