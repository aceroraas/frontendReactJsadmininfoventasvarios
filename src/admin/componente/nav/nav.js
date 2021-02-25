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
  const [user, setUser] = useState(
    JSON.parse(window.localStorage.getItem("user"))
  );
  useEffect(() => {
    if (window.localStorage.infomoney) {
      setRate(JSON.parse(window.localStorage.infomoney).rates);
      setMoneda(
        JSON.parse(window.localStorage.infomoney).national_currency_symbol
      );
    } else {
      axios.get("/public/infomoney").then((e) => {
        setRate(e.data.rates);
        setMoneda(e.data.national_currency_symbol);
        window.localStorage.setItem("infomoney", JSON.stringify(e.data));
      });
    }

    window.setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  }, []);
  return (
    <div className="nav-base">
      <div className="nav-control">
        <div className="nav-base-left">
          <div className="nav-base-logo">
            <Link to="/inicio">
              <img
                loading="lazy"
                className="nav-logo"
                src={logo}
                height="62px"
                width="320px"
                alt="imagotipo de infoventas varios"
              />
            </Link>
          </div>
        </div>
        <div className="nav-base-right">
          {user ? (
            user.permits?.rates ? (
              <div className="nav-base-input">
                <p>TASA:</p>
                <input
                  value={rate}
                  onInput={(e) => {
                    setRate(e.target.value);
                    if (window.localStorage.getItem("infomoney")) {
                      let temp = JSON.parse(
                        window.localStorage.getItem("infomoney")
                      );
                      temp.rates = e.target.value;
                    } else {
                      window.localStorage.setItem(
                        "infomoney",
                        JSON.stringify({
                          rates: e.target.value,
                          national_currency_symbol: moneda,
                        })
                      );
                    }
                    axios
                      .post(
                        "/conf/rates",
                        { rates: e.target.value },
                        { headers: { Authorization: `Bearer ${token}` } }
                      )
                      .then((e) => {
                        toast.success("💵 la tasa ha sido " + e.data.response, {
                          autoClose: 1500,
                        });
                      });
                  }}
                  type="number"
                  id="navrates"
                ></input>
                <p>{moneda}</p>
              </div>
            ) : (
              ""
            )
          ) : (
            ""
          )}
          <div className="nav-info">
            <div className="nav-base-cargo">
              <div className="nav-icon-cargo">
                <Icargo />
              </div>
              <p>{user?.position}</p>
            </div>
            <NavLink to="/profile">
              <div className="nav-base-usuario">
                <div className="nav-icon-usuario">
                  <Iusuario />
                </div>
                <p>{user?.user_name}</p>
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nav;
