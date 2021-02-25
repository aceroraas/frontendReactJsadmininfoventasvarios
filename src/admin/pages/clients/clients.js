import axios from "axios";
import { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import Bar from "../../componente/bar/bar";
import Goback from "../../componente/goback/goback";
import Nav from "../../componente/nav/nav";
import "./clients.css";
import { ReactComponent as Isearch } from "../../../media/icons/search-solid.svg";
import Loading from "../../componente/load/loading";

function SearchClient({ setter }) {
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  function buscarCliente(query) {
    axios
      .get(`/clients/query/${query}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((e) => {
        if (e.data.length !== 0) {
          toast.success("💪 Esto fue lo que encontre para ti");
          setter(e.data);
        } else {
          toast.info("🤷‍♂️ no encontre nada");
        }
      })
      .catch((er) => {
        toast.info("🤷‍♂️ no encontre nada");
      });
  }
  return (
    <>
      <div className="base-search">
        <div className="search">
          <div className="search-input">
            <input
              id="clientQuery"
              type="text"
              size="30"
              placeholder="Escriba el Rif O Cedula"
              onKeyPressCapture={(e) => {
                if (e.key === "Enter") {
                  toast.info(
                    `🧐 buscando ${
                      document.getElementById("clientQuery").value
                    }`
                  );
                  buscarCliente(e.target.value);
                }
              }}
            ></input>
          </div>
          <div className="search-btn">
            <button
              onClick={(e) => {
                toast.info(
                  `🧐 buscando ${document.getElementById("clientQuery").value}`
                );
                e.preventDefault();
                let query = document.getElementById("clientQuery").value;
                buscarCliente(query);
              }}
            >
              <Isearch />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function TableClients({ props }) {
  return (
    <>
      <div className="base-detail">
        <div>
          <table className="">
            <thead>
              <tr>
                <th>Correo</th>
                <th>Nombre</th>
                <th>Identificación</th>
                <th>Estatus de la cuenta</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {props?.map((e) => {
                return (
                  <tr key={e.id}>
                    <td>{e.email}</td>
                    <td>{`${e.first_name} ${e.second_name}`}</td>
                    <td>{e.national_id}</td>
                    <td>{e.account_enabled ? "Habilitada" : "Suspendida"}</td>
                    <td>
                      <Link
                        className="btn primary text-white"
                        to={`/clients/${e.id}`}
                      >
                        VER
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function Clients() {
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  const [clients, setClients] = useState(false);
  useEffect(() => {
    toast.info("😎 cargando clientes");
    axios
      .get("/clients/all", { headers: { Authorization: `Bearer ${token}` } })
      .then((e) => {
        setClients(e.data);
        toast.success("😎 Clientes Cargados");
      })
      .catch((e) => {
        if (e.response && e.response.status === 400) {
          toast.error(`🤦‍♂️ aff, ha ocurrido un error al pedir los clientes`, {
            autoClose: false,
            closeOnClick: true,
            draggable: true,
          });
        } else if (e.request) {
          toast.error(
            `💔, el servidor no me responde, ¿tienes internet? ¿y si lo intentas mas tarde?`,
            {
              autoClose: false,
              closeOnClick: true,
              draggable: true,
            }
          );
        } else {
          toast.error(
            `💔😰, a nooooo, ¿tienes internet? el navegador me dijo esto: ,${e.message}`,
            {
              autoClose: false,
              closeOnClick: true,
              draggable: true,
            }
          );
        }
      });
  }, [token]);
  return (
    <>
      <Nav />
      <Bar />
      <Goback />
      <div className="base">
        <SearchClient setter={setClients} />
        {clients ? (
          <TableClients props={clients} />
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
}
export default withRouter(Clients);
