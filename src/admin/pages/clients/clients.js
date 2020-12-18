import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useHistory, withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import Bar from "../../componente/bar/bar";
import Goback from "../../componente/goback/goback";
import Nav from "../../componente/nav/nav";
import "./clients.css";
import { ReactComponent as Isearch } from "../../../media/icons/search-solid.svg";

function SearchClient({ setter }) {
  const token = window.localStorage.getItem("token");

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
                  e.preventDefault();
                  let query = document.getElementById("clientQuery").value;
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
                    .catch((e) => {
                      toast.info("🤷‍♂️ no encontre nada");
                    });
                }
              }}
            ></input>
          </div>
          <div className="search-btn">
            <a
              href="#search"
              onClick={(e) => {
                toast.info(
                  `🧐 buscando ${document.getElementById("clientQuery").value}`
                );
                e.preventDefault();
                let query = document.getElementById("clientQuery").value;
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
                  .catch((e) => {
                    toast.info("🤷‍♂️ no encontre nada");
                  });
              }}
            >
              <Isearch />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

function TableClients({ props }) {
  return (
    <>
      <center>
        <table className="table-clients">
          <thead>
            <tr>
              <th>
                Correo
                <hr />
              </th>
              <th>
                Nombre
                <hr />
              </th>
              <th>
                Identificación
                <hr />
              </th>
              <th>
                Estatus de la cuenta
                <hr />
              </th>
              <th>
                Acción
                <hr />
              </th>
            </tr>
          </thead>
          <tbody>
            {props?.map((e) => {
              return (
                <tr key={e.id}>
                  <td>
                    {e.email}
                    <hr />
                  </td>
                  <td>
                    {`${e.first_name} ${e.second_name}`}
                    <hr />
                  </td>
                  <td>
                    {e.national_id}
                    <hr />
                  </td>
                  <td>
                    {e.account_enabled ? "Habilitada" : "Suspendida"}
                    <hr />
                  </td>
                  <td>
                    <Link to={`/clients/${e.id}`}>VER</Link>
                    <hr />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </center>
    </>
  );
}

function Clients() {
  const token = window.localStorage.getItem("token");
  const history = useHistory();
  const [clients, setClients] = useState([]);
  useEffect(() => {
    toast.info("😎 cargando clientes", { autoClose: 2500 });
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
      <Goback history={history} />
      <div className="base-clients">
        <SearchClient setter={setClients} />
        {clients.length !== 0 ? (
          <TableClients props={clients} />
        ) : (
          <center>
            <h2>No hay clientes :'C</h2>
          </center>
        )}
      </div>
    </>
  );
}
export default withRouter(Clients);
