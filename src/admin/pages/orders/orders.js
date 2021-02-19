import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useHistory, withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import Bar from "../../componente/bar/bar";
import Goback from "../../componente/goback/goback";
import Nav from "../../componente/nav/nav";
import "./orders.css";

function LoadOrders() {
  const [listOrders, setListOrders] = useState([]);
  const token = window.localStorage.getItem("token");
  useEffect(() => {
    toast.info("consultando lista de pedidos");
    axios
      .get("/orders/all", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((e) => {
        setListOrders(e.data);
        toast.success(
          `Genial tenemos ${e.data.length} ${
            e.data.length === 1 ? " pedido":"pedidos"
          }`
        );
      });
  }, [token]);
  return (
    <>
      <div className="base">
        <table className="table-users">
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Total</th>
              <th>Estato</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {listOrders.length === 0 ? (
              <center>
                <h3>No tenemos Pedidos Aun :'C</h3>
              </center>
            ) : (
              listOrders?.map((e, i) => {
                let estado = "Cargando";
                let btnestado = "Cargando";
                axios
                  .get(`/orders/name/${e.clients_id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                  })
                  .then((f) => {
                    let name = document.getElementById(
                      `tdClient${e.clients_id}`
                    );
                    if (name) {
                      name.innerText = `${f.data.first_name} ${f.data.second_name} ${f.data.national_id}`;
                    }
                  });

                switch (JSON.parse(e.properties).status_code) {
                  case 2724:
                    estado = "Sin atender";
                    btnestado = "Atender";
                    break;
                  case 2726:
                    estado = "Atendiendo";
                    btnestado = "Visualizar";
                    break;
                  case 2723:
                    estado = "Por Pagar";
                    btnestado = "Revisar Pago";
                    break;
                  case 2725:
                    estado = "Anulado Por Cliente";
                    btnestado = "Verificar anulación";
                    break;
                  case 2727:
                    estado = "Anulado Por Sistema";
                    btnestado = "Verificar anulación";
                    break;

                  case 2722:
                    estado = "Pagado";
                    btnestado = "Despachar";
                    break;
                  case 2721:
                    estado = "Despachado";
                    btnestado = "Obeservar";
                    break;
                  default:
                    estado = JSON.parse(e.properties).status_code;
                    break;
                }

                return (
                  <tr key={e.id}>
                    <td id={`tdClient${e.clients_id}`}></td>
                    <td>BS.S {e.total.toLocaleString()}</td>
                    <td>{estado}</td>
                    <td>
                      <Link to={`/orders/${e.id}`}>{btnestado}</Link>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

function Orders() {
  const history = useHistory();

  return (
    <>
      <Nav />
      <Bar />
      <Goback/>
      <LoadOrders />
    </>
  );
}
export default withRouter(Orders);
