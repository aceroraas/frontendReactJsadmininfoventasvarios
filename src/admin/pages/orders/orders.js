import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useHistory, withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import Bar from "../../componente/bar/bar";
import Goback from "../../componente/goback/goback";
import Loading from "../../componente/load/loading";
import Nav from "../../componente/nav/nav";
import "./orders.css";

function LoadOrders() {
  const [listOrders, setListOrders] = useState(false);
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  useEffect(() => {
    toast.info("consultando lista de pedidos");
    axios
      .get("/orders/all", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((e) => {
        setListOrders(e.data);
        if (e.data.length > 0) {
          toast.success(
            `Genial tenemos ${e.data.length} ${
              e.data.length === 1 ? " pedido" : "pedidos"
            }`
          );
        }
      });
  }, [token]);
  return (
    <>
      <div className="base-detail">
        <div>
          <table>
            <thead>
              <tr>
                <th>Usuario</th>
                <th>Total</th>
                <th>Estato</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {listOrders ? (
                listOrders?.map((e, i) => {
                  let estado = "Cargando";
                  let btnestado = "Cargando";
                  switch (e.properties) {
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
                      estado = e.properties;
                      break;
                  }

                  return (
                    <tr key={e.id}>
                      <td>
                        {e.first_name} {e.second_name}
                      </td>
                      <td>BS.S {e.total}</td>
                      <td>{estado}</td>
                      <td>
                        <Link
                          className="btn primary text-white"
                          to={`/orders/${e.id}`}
                        >
                          {btnestado}
                        </Link>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <Loading />
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function Orders() {
  return (
    <>
      <Nav />
      <Bar />
      <Goback />
      <div className="base">
        <LoadOrders />
      </div>
    </>
  );
}
export default withRouter(Orders);
