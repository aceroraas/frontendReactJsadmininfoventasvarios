import React from 'react';
import "./nav.css";
import logo from "../../../media/logos/imagotipo.svg";
import { ReactComponent as Icargo } from "../../../media/icons/briefcase-solid.svg";
import { ReactComponent as Iusuario } from "../../../media/icons/user-astronaut-solid.svg";
import { Link, NavLink } from "react-router-dom";
function Nav() {
  let moneda = "BS.S";
  const user = JSON.parse(window.localStorage.user);
  return (
    <div className="nav-base">
      <div className="nav-base-left">
        <div className="nav-base-logo">
          <Link to='/inicio'><img
            className="nav-logo"
            src={logo}
            height="62"
            alt="imagotipo de infoventas varios"
          /></Link>
        </div>
      </div>
      <div className="nav-base-right">
        <div className="nav-base-input">
          <p>TASA:</p>
          <input type="text"></input>
          <p>{moneda}</p>
        </div>
        <div className="nav-base-cargo">
          <div className="nav-icon-cargo">
            <Icargo />
          </div>
          <p>{user.position}</p>
        </div>
        <NavLink to="/profile">
          <div className="nav-base-usuario">
            <div className="nav-icon-usuario">
              <Iusuario />
            </div>
            <p>{user.user_name}</p>
          </div>
        </NavLink>
      </div>
    </div>
  );
}

export default Nav;
