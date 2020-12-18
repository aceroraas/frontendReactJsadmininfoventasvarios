import React, { useEffect, useState } from "react";
import "./dashboard.css";
import Bar from "../../componente/bar/bar";
import Nav from "../../componente/nav/nav";
import { ReactComponent as IsettinsUsers } from "../../../media/icons/users-cog-solid.svg";
import { ReactComponent as Iitems } from "../../../media/icons/shopping-bag-solid.svg";
import { ReactComponent as Icoupon } from "../../../media/icons/ticket-alt-solid.svg";
import { ReactComponent as Iads } from "../../../media/icons/ad-solid.svg";
import axios from "axios";
import { NavLink, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../../componente/load/loading";

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
  const [user, setUser] = useState({});
  const [countsClients, setCountsClients] = useState({});
  const [countsOrders, setCountsOrders] = useState({});
  const history = useHistory()
  const token = window.localStorage.getItem("token");
  useEffect(() => {
    axios
      .get("/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((e) => {
        setUser(e.data);
        toast.success(`Hola ${e.data.first_name}`,{autoClose:1500});
      }).catch((e)=>{
        if(e.request&&e.response){
          if(e.request.status && e.response.data){
            if(e.request.status===401 && e.response.data.message ==="Unauthenticated."){
              window.localStorage.clear();
              window.sessionStorage.clear();
              history.go(0);
            }
          }
        }
      });

    axios
      .get("/clients/count", { headers: { Authorization: `Bearer ${token}` } })
      .then((e) => {
        setCountsClients(e.data);
      });
      axios
      .get("/orders/count", { headers: { Authorization: `Bearer ${token}` } })
      .then((e) => {
        setCountsOrders(e.data);
      });
  }, [token]);
  window.localStorage.setItem("user", JSON.stringify(user));

  if (Object.keys(user).length !== 0) {
    return (
      <>
        <Nav/>
        <Bar />
        <div className="page">
          {user.permits.orders ? (
            <Card title="Pedidos" path="/orders" text={`${countsOrders.total??0}`} />
          ) : (
            ""
          )}
          {user.permits.clients ? (
            <Card title="Clientes" path="/clients" text={`${countsClients.total??0}`} />
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
  } else {
    return <><Nav/>
    <Bar />
      <Loading/>
  </>
  }
}
