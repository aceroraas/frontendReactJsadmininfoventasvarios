import React, { useEffect, useState } from "react";
import "./nav.css";
import logo from "../../../media/logos/imagotipo.svg";
import { ReactComponent as Icargo } from "../../../media/icons/briefcase-solid.svg";
import { ReactComponent as Iusuario } from "../../../media/icons/user-astronaut-solid.svg";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
function Nav() {
  const token = window.localStorage.getItem("token");
  const [moneda, setMoneda] = useState("BS.S");
  const [rate, setRate] = useState(0.0);
  const user = JSON.parse(window.localStorage.user);
  useEffect(() => {
    axios.get("/public/infomoney").then((e) => {
      setRate(e.data.rates);
      setMoneda(e.data.national_currency_symbol);
    });
    window.setTimeout(()=>{
      window.scrollTo(0,0);
    },100);
  }, []);
  return (
    <div className="nav-base">
      <div className="nav-base-left">
        <div className="nav-base-logo">
          <Link to="/inicio">
            <img
              className="nav-logo"
              src={logo}
              height="62"
              alt="imagotipo de infoventas varios"
            />
          </Link>
        </div>
      </div>
      <div className="nav-base-right">
        {user.permits?user.permits.rates ? (
          <div className="nav-base-input">
            <p>TASA:</p>
            <input
              value={rate}
              onInput={(e) => {
                setRate(e.target.value)
                axios.post(
                  "/conf/rates",
                  { rates: e.target.value },
                  { headers: { Authorization: `Bearer ${token}` } }
                ).then((e)=>{
                  toast.success('💵 la tasa ha sido ' + e.data.response,{autoClose:1500});
                });
              }}
              type="number"
              id='navrates'
            ></input>
            <p>{moneda}</p>
          </div>
        ) : (
          ""
        ):''}
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
