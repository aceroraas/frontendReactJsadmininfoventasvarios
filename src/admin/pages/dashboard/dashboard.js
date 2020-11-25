import React, { useEffect } from "react";
import "./dashboard.css";
import Bar from "../../componente/bar/bar";
import Nav from "../../componente/nav/nav";
import { ReactComponent as IsettinsUsers } from "../../../media/icons/users-cog-solid.svg";
import { ReactComponent as Iitems } from "../../../media/icons/shopping-bag-solid.svg";
import { ReactComponent as Icoupon } from "../../../media/icons/ticket-alt-solid.svg";
import { ReactComponent as Iads } from "../../../media/icons/ad-solid.svg";
import axios from "axios";
import { NavLink } from "react-router-dom";

const Card = ({ title, path, Icon, text }) => {
  return (
    <>
      <NavLink to={path}>
        <div className="card-base">
          <div className="card-base-title">
            <h4>{title}</h4>
            <hr />
          </div>
          <div className="card-icon">{text ?? <Icon />}</div>
        </div>
      </NavLink>
    </>
  );
};

export default function Dashboard() {
  useEffect(() => {
    axios
      .get("/auth/profile", {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      })
      .then((response) =>
        window.localStorage.setItem("user", JSON.stringify(response.data))
      );
  }, []);

  let user = JSON.parse(window.localStorage.user);
  return (
    <>
      <Nav className="nav" position={user.position} userName={user.user_name} />
      <Bar />
      <div className="page">
        {user.permits.orders ? (
          <Card title="Pedidos" path="/orders" text={0} />
        ) : (
          ""
        )}
        {user.permits.clients ? (
          <Card title="Clientes" path="/clients" text={0} />
        ) : (
          ""
        )}
        {user.permits.coupons ? (
          <Card title="Cupones" path="/coupons" Icon={Icoupon} />
        ) : (
          ""
        )}
        {user.permits.items ? (
          <Card title="Productos" path="/items" Icon={Iitems} />
        ) : (
          ""
        )}
        {user.permits.ads ? (
          <Card title="Anuncios" path="/ads" Icon={Iads} />
        ) : (
          ""
        )}
        {user.permits.users ? (
          <Card
            title="Usuarios del sistema"
            path="/settings-users"
            Icon={IsettinsUsers}
          />
        ) : (
          ""
        )}
      </div>
    </>
  );
}
