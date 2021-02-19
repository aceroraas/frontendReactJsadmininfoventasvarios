import { withRouter } from "react-router-dom";
import Bar from "../../componente/bar/bar";
import Goback from "../../componente/goback/goback";
import Nav from "../../componente/nav/nav";
import "./search.css";
import { ReactComponent as Isearch } from "../../../media/icons/search-solid.svg";
import { useEffect, useState } from "react";
import Loading from "../../componente/load/loading";
import ReactDOM from "react-dom";
import Axios from "axios";
import { ReactComponent as Iitem } from "../../../media/icons/shopping-bag-solid.svg";
import { ReactComponent as Iclients } from "../../../media/icons/user-solid.svg";
import { ReactComponent as Iorders } from "../../../media/icons/shopping-cart-solid.svg";
import { ReactComponent as Icoupons } from "../../../media/icons/ticket-alt-solid.svg";
import { ReactComponent as Iusers } from "../../../media/icons/user-astronaut-solid.svg";
import { ReactComponent as Icatalogo } from "../../../media/icons/file-solid.svg";

async function getdata(query) {
  const AxiosConfig = {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  };
  const page = document.getElementById("rs");
  await Axios.get(`/search/info/${query}`, AxiosConfig).then((e) => {
    ReactDOM.unmountComponentAtNode(page);
    ReactDOM.render(<Resultados result={e.data} />, page);
  });
}

function Resultados({ result }) {
  useEffect(() => {
    let isclick = false;
    const body = document.querySelectorAll(".module");
    for (let i = 0; i < body.length; i++) {
      body[i].addEventListener("click", (e) => {
        e.preventDefault();
        isclick = !isclick;
        if (isclick) {
          body[i].lastElementChild.classList.add("contain");
          body[i].lastElementChild.classList.remove("hidden");
        } else {
          body[i].lastElementChild.classList.remove("contain");
          body[i].lastElementChild.classList.add("hidden");
        }
      });
    }
  }, []);
  const CATALOGOS = result.CATALOGOS;
  const USERS = result.USERS;
  const ORDERS = result.ORDERS;
  const COUPONS = result.COUPONS;
  const CLIENTS = result.CLIENTS;
  const ITEMS = result.ITEMS;
  return (
    <>
      <div className="main-resultados">
        {ITEMS.length > 0 ? (
          <div className="module">
            <div className="icon-module">
              <Iitem/>
            </div>
            <div className="body-module">
              <h5>MODULO PRODUCTOS</h5>
              <p>Coinciencias: {ITEMS.length}</p>
            </div>
            <div className="hidden">
              {ITEMS?.map((e) => {
                return (
                  <div
                    onClick={() => {
                      window.location = `/items/edit/${e.id}`;
                    }}
                  >
                    {e.title}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          ""
        )}

        {CLIENTS.length > 0 ? (
          <div className="module">
            <div className="icon-module">
            <Iclients/>
            </div>
            <div className="body-module">
              <h5>MODULO CLIENTES</h5>
              <p>Coinciencias: {CLIENTS.length}</p>
            </div>
            <div className="hidden">
              {CLIENTS?.map((e) => {
                return (
                  <div
                    onClick={() => {
                      window.location = `/clients/${e.id}`;
                    }}
                  >
                    {e.first_name} {e.second_name} {e.national_id}{" "}
                    {e.deleted_at ? `Eliminado el: ${e.deleted_at}` : ""}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          ""
        )}
        {COUPONS.length > 0 ? (
          <div className="module">
            <div className="icon-module">
            <Icoupons />
            </div>
            <div className="body-module">
              <h5>MODULO CUPONES</h5>
              <p>Coinciencias: {COUPONS.length}</p>
            </div>
            <div className="hidden">
              {COUPONS?.map((e) => {
                return (
                  <div
                    onClick={() => {
                      window.location = `/coupons`;
                    }}
                  >
                   Cupon: {e.code} Descuento: {e.discount}% Expira: {e.expire}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          ""
        )}
        {ORDERS.length > 0 ? (
          <div className="module">
            <div className="icon-module">
              <Iorders/>
            </div>
            <div className="body-module">
              <h5>MODULO PEDIDOS</h5>
              <p>Coinciencias: {ORDERS.length}</p>
            </div>
            <div className="hidden">
              {ORDERS?.map((e) => {
                return (
                  <div
                    onClick={() => {
                      window.location = `/orders/${e.id}`;
                    }}
                  >
                    {e.id} {e.deleted_at ? `Eliminado el: ${e.deleted_at}` : ""}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          ""
        )}
        {USERS.length > 0 ? (
          <div className="module">
            <div className="icon-module">
              <Iusers/>
            </div>
            <div className="body-module">
              <h5>MODULO USUARIOS DEL SISTEMA</h5>
              <p>Coinciencias: {USERS.length}</p>
            </div>
            <div className="hidden">
              {USERS?.map((e) => {
                return (
                  <div
                    onClick={() => {
                      window.location = `/settings-users/${e.id}`;
                    }}
                  >
                    ({e.user_name}) {e.positions} {e.first_name} {e.second_name}{" "}
                    {e.national_id}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          ""
        )}
        {CATALOGOS.length > 0 ? (
          <div className="module">
            <div className="icon-module">
              <Icatalogo />
            </div>
            <div className="body-module">
              <h5>MODULO CATALOGOS</h5>
              <p>Coinciencias: {CATALOGOS.length}</p>
            </div>
            <div className="hidden">
              {CATALOGOS?.map((e) => {
                return (
                  <div
                    onClick={() => {
                      window.location = `${e.urlcatalogo}`;
                    }}
                  >
                    {e.name}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
function Buscar() {
  const [buscando, setBuscando] = useState(false);
  useEffect(() => {
    const btnbuscar = document.getElementById("btnbuscar");
    const querybuscar = document.getElementById("querybuscador");
    querybuscar.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        if (querybuscar.value.length > 0) {
          setBuscando(true);
          getdata(querybuscar.value);
          querybuscar.value = "";
          setBuscando(false);
        }
      }
    });
    btnbuscar.addEventListener("click", (e) => {
      e.preventDefault();
      if (querybuscar.value.length > 0) {
        setBuscando(true);
        getdata(querybuscar.value);
        querybuscar.value = "";
        setBuscando(false);
      }
    });
  });
  if (buscando) {
    const page = document.getElementById("rs");
    ReactDOM.render(<Loading />, page);
  } else {
  }
  return (
    <>
      <div className="main-buscador">
        <div className="buscador">
          <input
            autoComplete="off"
            maxLength="191"
            placeholder="Buscar"
            type="text"
            id="querybuscador"
            className="buscador-input"
          />
          <div className="boton-buscar" id="btnbuscar">
            <Isearch />
          </div>
        </div>
      </div>
    </>
  );
}

function Search() {
  return (
    <>
      <Nav />
      <Bar />
      <Goback />
      <div className="base">
        <Buscar />
        <div id="rs" className="base"></div>
      </div>
    </>
  );
}

export default withRouter(Search);
