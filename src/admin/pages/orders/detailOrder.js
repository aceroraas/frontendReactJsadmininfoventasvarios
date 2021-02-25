import axios from "axios";
import { useEffect, useState } from "react";
import { ReactComponent as Iusuario } from "../../../media/icons/user-astronaut-solid.svg";
import { Link, useHistory, useParams, withRouter } from "react-router-dom";
import Bar from "../../componente/bar/bar";
import Goback from "../../componente/goback/goback";
import Nav from "../../componente/nav/nav";
import "./orders.css";
import { toast } from "react-toastify";
import { Modal, ModalTransition, useModal } from "react-simple-hook-modal";
import Loading from "../../componente/load/loading";

const ConfirmDelete = () => {
  const { isModalOpen, openModal, closeModal } = useModal();
  const { id } = useParams();
  const history = useHistory();
  const token = window.localStorage.getItem("token");
  return (
    <>
      <Link className="red" onClick={openModal}>
        Eliminar Pedido
      </Link>
      <Modal isOpen={isModalOpen} transition={ModalTransition.BOTTOM_UP}>
        <div className="modal-body">
          <div className="modal-title">
            <h2>Eliminar Pedido</h2>
          </div>
          <div className="modal">
            <p>
              Si desea eliminar el archivo pero luego consultarlo, selecione el
              boton eliminar para dejar una copia como eliminado.
              <br />
              <br /> si usted desea eliminarlo sin guardar respaldo de este
              documento seleccione eliminar Permanentemente
            </p>
          </div>
          <br />
          <br />
          <br />
          <div className="modal-btn">
            <Link className="red" onClick={closeModal}>
              Salir
            </Link>
            <Link
              className="primary"
              onClick={(e) => {
                e.preventDefault();
                axios
                  .delete(`/orders/delete/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                  })
                  .then(() => {
                    toast.success("pedido eliminado");
                    closeModal(e);
                    history.push("/orders");
                  });
              }}
            >
              eliminar
            </Link>
            <Link
              className="secundary"
              onClick={(e) => {
                e.preventDefault();
                axios
                  .delete(`/orders/destroy/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                  })
                  .then(() => {
                    toast.success("pedido destruido");
                    closeModal(e);
                    history.push("/orders");
                  });
              }}
            >
              eliminar Permanentemente
            </Link>
          </div>
        </div>
      </Modal>
    </>
  );
};

function DetailOrder({ order }) {
  const [user, setUser] = useState(
    JSON.parse(window.localStorage.getItem("user"))
  );
  const [local, setLocal] = useState(order);
  const [statusCode, setStatusCode] = useState(2724);
  const [statusRefCode, setStatusRefCode] = useState("sin antender");
  const token = window.localStorage.getItem("token");

  useEffect(() => {
    setLocal(order);
  }, [order]);
  useEffect(() => {
    let updateOrder = new CustomEvent("updateOrder", {
      detail: local,
      bubbles: true,
      cancelable: false,
    });
    document.dispatchEvent(updateOrder);
  }, [local]);

  useEffect(() => {
    switch (local.properties.status_code) {
      case 2724:
        setStatusRefCode("Sin atender");
        setStatusCode(2724);
        break;
      case 2726:
        setStatusRefCode(
          `Esta siendo atendiedo por ${local.properties.seller_name} (${local.properties.seller_user})`
        );
        setStatusCode(2726);
        break;
      case 2723:
        setStatusRefCode(
          `en espera de pago, solicitado por ${local.properties.seller_name} (${local.properties.seller_user})`
        );
        setStatusCode(2723);
        break;
      case 2725:
        setStatusRefCode("Anulado Por Cliente");
        setStatusCode(2725);
        break;
      case 2727:
        setStatusRefCode(
          `Anulado por ${local.properties.seller_name} (${local.properties.seller_user})`
        );
        setStatusCode(2727);
        break;

      case 2722:
        setStatusRefCode(
          `Pagado - Verificado por ${local.properties.seller_name} (${local.properties.seller_user})`
        );
        setStatusCode(2722);
        break;
      case 2721:
        setStatusRefCode(
          `Despachado por ${local.properties.seller_name} (${local.properties.seller_user})`
        );
        setStatusCode(2721);
        break;
      default:
        setStatusRefCode("---");
        break;
    }
  }, [local]);

  return (
    <>
      <div className="base-client">
        <div className="base-client-top">
          <div className="base-client-letf">
            <div className="client-info">
              <table>
                <thead>
                  <tr>
                    <td className="text-primary">Estado del pedido:</td>
                    <td className="text-secundary">{statusRefCode}</td>
                  </tr>
                  <tr>
                    <td className="text-primary">codigo de referencia:</td>
                    <td className="text-secundary">
                      {local.properties.ref_code ?? "SIN CODIGO DE REFERENCIA"}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-primary">Metodo de pago</td>
                    <td className="text-secundary">
                      {local.properties.cart_properties.payment_type}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-primary">Entrega:</td>
                    <td className="text-secundary">
                      {local.properties.cart_properties.delivery
                        ? "Delivery"
                        : "Restiro Personal"}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-primary">Costo Delivery:</td>
                    <td className="text-secundary">
                      ${" "}
                      {Intl.NumberFormat("es-VE").format(
                        local.properties.cart_properties.delivery_price.toFixed(
                          2
                        )
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-primary">Tasa de cambio:</td>
                    <td className="text-secundary">
                      Bs.S{" "}
                      {Intl.NumberFormat("es-VE").format(
                        local.properties.rate.toFixed(2)
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-primary">Subtotal $:</td>
                    <td className="text-secundary">
                      ${" "}
                      {Intl.NumberFormat("es-VE").format(
                        local.subtotal.toFixed(2)
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-primary">Subtotal BS.S:</td>
                    <td className="text-secundary">
                      Bs.S{" "}
                      {Intl.NumberFormat("es-VE").format(
                        (local.subtotal * local.properties.rate).toFixed(2)
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-primary">Cupon Codigo:</td>
                    <td className="text-secundary">
                      {local.properties.coupon ?? " "}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-primary">Cupon Descuento:</td>
                    <td className="text-secundary">
                      {local.properties.coupon_discont ?? 0} %
                    </td>
                  </tr>
                  <tr>
                    <td className="text-primary">IVA:</td>
                    <td className="text-secundary">{local.iva} %</td>
                  </tr>
                  <tr>
                    <td className="text-primary">Total:</td>
                    <td className="text-secundary">
                      Bs.S{" "}
                      {Intl.NumberFormat("es-VE").format(
                        local.total.toFixed(2)
                      )}
                    </td>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
          <div className="base-client-right">
            <table className="table-users">
              <tr>
                <td>
                  {statusCode === 2724 ? (
                    <button
                      className="btn primary text-white"
                      onClick={(e) => {
                        e.preventDefault();
                        toast.info("Asignando Cliente...");
                        let data = {
                          orderid: local.id,
                          statuscode: 2726,
                        };
                        axios
                          .put("orders/update", data, {
                            headers: { Authorization: `Bearer ${token}` },
                          })
                          .then((e) => {
                            setLocal(e.data);
                            toast.success(
                              `Cliente Asignado a ${user.first_name} (${user.user_name})`
                            );
                          })
                          .catch((er) => {
                            if (er.response) {
                              if (er.response.data) {
                                if (er.response.data.response) {
                                  toast.error(er.response.data.response);
                                }
                              }
                            }
                          });
                      }}
                    >
                      ATENDER
                    </button>
                  ) : (
                    ""
                  )}
                  {local.properties.status_code === 2726 ? (
                    <button
                      className="btn secundary text-white"
                      onClick={(e) => {
                        e.preventDefault();
                        toast.info("Solicitando");
                        let data = {
                          orderid: local.id,
                          statuscode: 2723,
                        };
                        axios
                          .put("orders/update", data, {
                            headers: { Authorization: `Bearer ${token}` },
                          })
                          .then((e) => {
                            setLocal(e.data);
                            toast.success(
                              `${user.first_name} pago solicitado, espere el codigo de referencia para aprobar`
                            );
                          })
                          .catch((er) => {
                            if (er.response) {
                              if (er.response.data) {
                                if (er.response.data.response) {
                                  toast.error(er.response.data.response);
                                }
                              }
                            }
                          });
                      }}
                    >
                      SOLICITAR PAGO
                    </button>
                  ) : (
                    ""
                  )}
                  {local.properties.status_code === 2723 &&
                  local.properties.ref_code ? (
                    <button
                      className="btn green text-white"
                      onClick={(e) => {
                        e.preventDefault();
                        toast.info("Aprobando...");
                        let data = {
                          orderid: local.id,
                          statuscode: 2722,
                        };
                        axios
                          .put("orders/update", data, {
                            headers: { Authorization: `Bearer ${token}` },
                          })
                          .then((e) => {
                            setLocal(e.data);
                            toast.success(
                              `Pago Verificado y Aprobado por ${user.first_name}`
                            );
                          })
                          .catch((er) => {
                            if (er.response) {
                              if (er.response.data) {
                                if (er.response.data.response) {
                                  toast.error(er.response.data.response);
                                }
                              }
                            }
                          });
                      }}
                    >
                      APROBAR PAGO
                    </button>
                  ) : (
                    ""
                  )}
                  {local.properties.status_code === 2722 ? (
                    <button
                      className="btn green text-white"
                      onClick={(e) => {
                        e.preventDefault();
                        toast.info("Actualizando Estado");
                        let data = {
                          orderid: local.id,
                          statuscode: 2721,
                        };
                        axios
                          .put("orders/update", data, {
                            headers: { Authorization: `Bearer ${token}` },
                          })
                          .then((e) => {
                            setLocal(e.data);
                            toast.success(
                              `${user.first_name} ya se ha notificado al cliente como despachado, en brever se le enviara una nota de entrega al correo del cliente`,
                              { autoClose: false }
                            );
                          })
                          .catch((er) => {
                            if (er.response) {
                              if (er.response.data) {
                                if (er.response.data.response) {
                                  toast.error(er.response.data.response);
                                }
                              }
                            }
                          });
                      }}
                    >
                      DESPACHAR
                    </button>
                  ) : (
                    ""
                  )}
                </td>
              </tr>
              <tr>
                <td>
                  {local.properties.status_code === 2726 ||
                  local.properties.status_code === 2724 ||
                  (local.properties.status_code === 2723 &&
                    !local.properties.ref_code) ? (
                    <button
                      className="btn red text-white"
                      onClick={(e) => {
                        e.preventDefault();
                        toast.info("Cargando");
                        let data = {
                          orderid: local.id,
                          statuscode: 2727,
                        };
                        axios
                          .put("orders/update", data, {
                            headers: { Authorization: `Bearer ${token}` },
                          })
                          .then((e) => {
                            setLocal(e.data);
                            toast.success(
                              `Pedido anulado por ${user.first_name}`
                            );
                          })
                          .catch((er) => {
                            if (er.response) {
                              if (er.response.data) {
                                if (er.response.data.response) {
                                  toast.error(er.response.data.response);
                                }
                              }
                            }
                          });
                      }}
                    >
                      ANULAR
                    </button>
                  ) : (
                    ""
                  )}
                </td>
              </tr>
              <tr>
                <td>
                  {local.properties.status_code === 2727 ||
                  local.properties.status_code === 2725 ? (
                    <ConfirmDelete />
                  ) : (
                    ""
                  )}
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

function DetailClient({ client }) {
  return (
    <>
      <div className="base-client">
        <div className="base-client-letf">
          <div className="client-info">
            <table>
              <thead>
                <tr>
                  <td className="text-primary">
                    {client.account_type ? "Empresa:" : "Nombre:"}
                  </td>
                  <td className="text-secundary">
                    {client.first_name} {client.second_name}
                  </td>
                </tr>
                <tr>
                  <td className="text-primary">
                    {client.account_type ? "Rif:" : "Cedula:"}
                  </td>
                  <td className="text-secundary">{client.national_id}</td>
                </tr>
                <tr>
                  <td className="text-primary">Correo:</td>
                  <td className="text-secundary">{client.email}</td>
                </tr>
                <tr>
                  <td className="text-primary">Telefono:</td>
                  <td className="text-secundary">{client.number_phone}</td>
                </tr>
                <tr>
                  <td className="text-primary">Usuario:</td>
                  <td className="text-secundary">{client.user_name}</td>
                </tr>
                <tr>
                  <td className="text-primary">Dirección:</td>
                  <td className="text-secundary">{client.location}</td>
                </tr>
                <tr>
                  <td className="text-primary">
                    {client.account_type
                      ? "Aniversario Empresa:"
                      : "Fecha de Nacimiento:"}
                  </td>
                  <td className="text-secundary">
                    {client.date_of_birth_or_celebration_company}
                  </td>
                </tr>
              </thead>
            </table>
          </div>
        </div>
        <div className="base-client-right">
          <center>
            <div className="img-background ">
              <div className="img">
                <Iusuario />
              </div>
            </div>
            <div className="client-buttons">
              <Link
                className="primary text-white"
                to={"/orders/order/user/" + client.id}
              >
                Historial de Transapciones
              </Link>
            </div>
          </center>
        </div>
      </div>
    </>
  );
}

function DetailistItemOfCard({ items, setTer }) {
  const [listItem, setListItems] = useState(items.properties);
  const token = window.localStorage.getItem("token");
  useEffect(() => {
    document.addEventListener("updateOrder", (e) => {
      setListItems(e.detail.properties);
    });
  }, []);
  useEffect(() => {
    setListItems(items.properties);
  }, [items]);
  return (
    <>
      <div className="base-detail">
        <div>
          <table>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio $</th>
                <th>Cantidad</th>
                <th>SubTotal $</th>
                <th>SubTotal BS.S</th>
                {listItem.status_code === 2726 ? <th>Eliminar</th> : ""}
              </tr>
            </thead>
            <tbody>
              {listItem?.items?.map((e) => {
                return (
                  <tr key={e.id}>
                    <td>
                      <img
                        width="50px"
                        height="50px"
                        src={e.url_images.img_one}
                        alt={e.title}
                      />
                      <h5>{e.title}</h5>
                    </td>
                    <td>
                      $ {Intl.NumberFormat("es-VE").format(e.price.toFixed(2))}
                    </td>
                    <td>
                      {listItem.status_code === 2726 ? (
                        <input
                          type="number"
                          value={e.quantity}
                          min="1"
                          max={e.stock}
                          onInput={(ev) => {
                            let data = {
                              orderid: items.id,
                              iditem: e.id,
                              quantity: ev.target.value,
                            };
                            axios
                              .put("/orders/edit", data, {
                                headers: { Authorization: `Bearer ${token}` },
                              })
                              .then((e) => {
                                if (e.data) {
                                  if (e.data.properties) {
                                    setTer(e.data);
                                  }
                                }
                              });
                          }}
                        />
                      ) : (
                        e.quantity
                      )}
                    </td>
                    <td>
                      ${" "}
                      {Intl.NumberFormat("es-VE").format(
                        (e.price * e.quantity).toFixed(2)
                      )}
                    </td>
                    <td>
                      BS.S{" "}
                      {Intl.NumberFormat("es-VE").format(
                        ((e.price * e.quantity )* listItem.rate).toFixed(2)
                      )}
                    </td>
                    {listItem.status_code === 2726 ? (
                      <td>
                        <button
                          className="red btn text-white"
                          onClick={() => {
                            let data = {};
                            axios
                              .delete(
                                `/orders/deleteitem/${e.id}/${items.id}`,
                                {
                                  headers: { Authorization: `Bearer ${token}` },
                                }
                              )
                              .then((e) => {
                                if (e.data) {
                                  if (e.data.properties) {
                                    setTer(e.data);
                                  }
                                }
                              })
                              .catch((er) => {
                                if (er.response) {
                                  if (er.response.data) {
                                    if (er.response.data.response) {
                                      toast.error(er.response.data.response);
                                    }
                                  }
                                }
                              });
                          }}
                        >
                          Eliminar
                        </button>
                      </td>
                    ) : (
                      ""
                    )}
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

function DetailOrders() {
  const [client, setClient] = useState(false);
  const [order, setOrder] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    axios
      .get(`/orders/detail/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((e) => {
        setOrder(e.data.order);
        setClient(e.data.client);
      });
  }, [id]);
  if (order && client) {
    return (
      <>
        <Nav />
        <Bar />
        <Goback />
        <div className="base">
          <DetailClient client={client} />
          {order ? <DetailOrder order={order} /> : ""}
          {order ? <DetailistItemOfCard items={order} setTer={setOrder} /> : ""}
        </div>
      </>
    );
  } else {
    return (
      <>
        <Loading />{" "}
      </>
    );
  }
}
export default withRouter(DetailOrders);
