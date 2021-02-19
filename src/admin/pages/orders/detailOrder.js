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

const Quantity = ({ quantity, item }) => {
  const { id } = useParams();

  const [quant, setQuant] = useState(quantity);
  const token = window.localStorage.getItem("token");
  const history = useHistory();
  return (
    <>
      <Link
        onClick={() => {
          if (quant > 0) {
            setQuant(quant - 1);
            toast.info("porfavor espere");
            axios
              .put(
                "/orders/editquantity",
                {
                  quantity: quant - 1,
                  id_order: parseInt(id),
                  id_item: item,
                },
                { headers: { Authorization: `Bearer ${token}` } }
              )
              .then((e) => {
                toast.success("genial, dejame actualizar datos");
                history.go(0);
              });
          }
        }}
      >
        -
      </Link>
      {quant}
      <Link
        onClick={() => {
          setQuant(quant + 1);
          toast.info("porfavor espere");
          axios
            .put(
              "/orders/editquantity",
              {
                quantity: quant + 1,
                id_order: parseInt(id),
                id_item: item,
              },
              { headers: { Authorization: `Bearer ${token}` } }
            )
            .then((e) => {
              toast.success("genial, dejame actualizar datos");
              setTimeout(() => {
                history.go(0);
              }, 1000);
            });
        }}
      >
        +
      </Link>
    </>
  );
};

const ConfirmDelete = () => {
  const { isModalOpen, openModal, closeModal } = useModal();
  const { id } = useParams();
  const history = useHistory();
  const token = window.localStorage.getItem('token');
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
                axios.delete(`/orders/delete/${id}`,{headers:{Authorization:`Bearer ${token}`}}).then(() => {
                  toast.success("pedido eliminado");
                  closeModal(e);
                  history.push('/orders');
                });
              }}
            >
              eliminar
            </Link>
            <Link
              className="secundary"
              onClick={(e) => {
                e.preventDefault();
                axios.delete(`/orders/destroy/${id}`,{headers:{Authorization:`Bearer ${token}`}}).then(() => {
                  toast.success("pedido destruido");
                  closeModal(e);
                  history.push('/orders');

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

function DetailOrder({ order, rate }) {
  let user = JSON.parse(window.localStorage.getItem("user"));
  let properties = JSON.parse(order.properties);
  const token = window.localStorage.getItem("token");
  const { id } = useParams();
  const history = useHistory();
  let estado = "--";

  switch (properties.status_code) {
    case 2724:
      estado = "Sin atender";
      break;
    case 2726:
      estado = `Esta siendo atendiedo por ${properties.seller_name} (${properties.seller_user})`;
      break;
    case 2723:
      estado = `en espera de pago, solicitado por ${properties.seller_name} (${properties.seller_user})`;
      break;
    case 2725:
      estado = "Anulado Por Cliente";
      break;
    case 2727:
      estado = `Anulado por ${properties.seller_name} (${properties.seller_user})`;
      break;

    case 2722:
      estado = `Pagado - Verificado por ${properties.seller_name} (${properties.seller_user})`;
      break;
    case 2721:
      estado = `Despachado por ${properties.seller_name} (${properties.seller_user})`;
      break;
    default:
      estado = properties.status_code ?? "---";
      break;
  }

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
                    <td className="text-secundary">{estado}</td>
                  </tr>
                  <tr>
                    <td className="text-primary">codigo de referencia:</td>
                    <td className="text-secundary">
                      {properties.ref_code ?? "---"}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-primary">Metodo de pago</td>
                    <td className="text-secundary">
                      {properties.cart_properties.payment_type ?? "---"}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-primary">Entrega:</td>
                    <td className="text-secundary">
                      {properties.cart_properties.delivery
                        ? "Delivery"
                        : "Restiro Personal"}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-primary">Subtotal $:</td>
                    <td className="text-secundary">
                      {order.subtotal ?? "---"} $
                    </td>
                  </tr>
                  <tr>
                    <td className="text-primary">Subtotal BS.S:</td>
                    <td className="text-secundary">
                      {(order.subtotal * rate).toLocaleString() ?? "---"} Bs.S
                    </td>
                  </tr>
                  <tr>
                    <td className="text-primary">IVA:</td>
                    <td className="text-secundary">
                      {properties.cart_properties.iva
                        ? order.iva ?? "---"
                        : "---"}
                      %
                    </td>
                  </tr>
                  <tr>
                    <td className="text-primary">Total:</td>
                    <td className="text-secundary">
                      {order.total.toLocaleString() ?? "---"} Bs.S
                    </td>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
          <div className="base-client-right">
            <table className="table-users">
              <tr>
                <td id="atendiendo">
                  {properties.status_code === 2724 ? (
                    <Link
                      to="#a"
                      onClick={(e) => {
                        e.preventDefault();
                        toast.info("CARGANDO...");
                        properties.status_code = 2726;
                        properties.seller_name = user.first_name;
                        properties.seller_id = user.id;
                        properties.seller_user = user.user_name;
                        axios
                          .put(
                            "orders/update",
                            { id, properties: JSON.stringify(properties) },
                            { headers: { Authorization: `Bearer ${token}` } }
                          )
                          .then(() => {
                            history.go();
                            toast.success("Cliente asignado");
                          });
                      }}
                      className="btn"
                    >
                      ATENDER
                    </Link>
                  ) : (
                    ""
                  )}
                </td>
              </tr>
              <tr>
                <td>
                  {properties.status_code === 2726 ||
                  properties.status_code === 2724 ||
                  (properties.status_code === 2723 && !properties.ref_code) ? (
                    <Link
                      className="btn"
                      onClick={(e) => {
                        e.preventDefault();
                        toast.info("Cargando");
                        properties.status_code = 2727;
                        properties.seller_name = user.first_name;
                        properties.seller_id = user.id;
                        properties.seller_user = user.user_name;
                        axios
                          .put(
                            "orders/update",
                            { id, properties: JSON.stringify(properties) },
                            { headers: { Authorization: `Bearer ${token}` } }
                          )
                          .then(() => {
                            history.go();
                            toast.success("Pedido Anulado");
                          });
                      }}
                    >
                      ANULAR
                    </Link>
                  ) : (
                    ""
                  )}
                </td>
              </tr>
              <tr>
                <td>
                  {properties.status_code === 2726 ? (
                    <Link
                      className="btn"
                      onClick={(e) => {
                        e.preventDefault();
                        toast.info("Solicitando");
                        properties.status_code = 2723;
                        properties.seller_name = user.first_name;
                        properties.seller_id = user.id;
                        properties.seller_user = user.user_name;
                        axios
                          .put(
                            "orders/update",
                            { id, properties: JSON.stringify(properties) },
                            { headers: { Authorization: `Bearer ${token}` } }
                          )
                          .then(() => {
                            history.go();
                            toast.success(
                              "Pago Solicitado, esperando numero de referencia"
                            );
                          });
                      }}
                    >
                      SOLICITAR PAGO
                    </Link>
                  ) : (
                    ""
                  )}
                </td>
              </tr>
              <tr>
                <td>
                  {properties.status_code === 2723 && properties.ref_code ? (
                    <Link
                      className="btn"
                      onClick={(e) => {
                        e.preventDefault();
                        toast.info("Aprobando");
                        properties.status_code = 2722;
                        properties.seller_name = user.first_name;
                        properties.seller_id = user.id;
                        properties.seller_user = user.user_name;
                        axios
                          .put(
                            "orders/update",
                            { id, properties: JSON.stringify(properties) },
                            { headers: { Authorization: `Bearer ${token}` } }
                          )
                          .then(() => {
                            history.go();
                            toast.success(
                              "Genial, Presiona despachar cuando lo entregres"
                            );
                          });
                      }}
                    >
                      APROBAR PAGO
                    </Link>
                  ) : (
                    ""
                  )}
                </td>
              </tr>
              <tr>
                <td>
                  {properties.status_code === 2722 ? (
                    <Link
                      className="btn"
                      onClick={(e) => {
                        e.preventDefault();
                        toast.info("Actualizando Estado");
                        properties.status_code = 2721;
                        properties.seller_name = user.first_name;
                        properties.seller_id = user.id;
                        properties.seller_user = user.user_name;
                        axios
                          .put(
                            "orders/update",
                            { id, properties: JSON.stringify(properties) },
                            { headers: { Authorization: `Bearer ${token}` } }
                          )
                          .then(() => {
                            history.go();
                            toast.success(
                              "Excelente, una mas de tu parte, sigue asi"
                            );
                          });
                      }}
                    >
                      DESPACHAR
                    </Link>
                  ) : (
                    ""
                  )}
                </td>
              </tr>
              <tr>
                <td>
                  {properties.status_code === 2727 ||
                  properties.status_code === 2725 ? (
                    <ConfirmDelete />
                  ) : (
                    ""
                  )}
                </td>
              </tr>
            </table>
          </div>
        </div>
        <hr />
      </div>
    </>
  );
}

function DetailClient({ props }) {
  const client = props;
  return (
    <>
      <div className="base-client">
        <div className="base-client-top">
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
      </div>
    </>
  );
}

function DetailItemsOfCard({ items }) {
  const litems = items.items;
  const sumatory = items.sumatory;
  const rates = items.rate;
  const { id } = useParams();
  const token = window.localStorage.getItem("token");
  const history = useHistory();

  return (
    <>
      <div className="base">
        <table className="table-users">
          <thead>
            <tr>
              <th>
                Producto
                <hr />
              </th>
              <th>
                Precio $<hr />
              </th>
              <th>
                Cantidad
                <hr />
              </th>
              <th>
                SubTotal $<hr />
              </th>
              <th>
                SubTotal BS.S
                <hr />
              </th>
              <th>
                Acción
                <hr />
              </th>
            </tr>
            <tr></tr>
          </thead>
          <tbody>
            {litems?.map((e) => {
              let quantity = 1;
              for (let i = 0; i < sumatory.length; i++) {
                if (sumatory[i].items_id === e.id) {
                  quantity = sumatory[i].quantity;
                }
              }
              return (
                <tr key={e.id}>
                  <td>
                    <div className="img-div">
                      <img
                        src={JSON.parse(e.url_images).img_one}
                        alt={e.title}
                      />
                      <p>{e.title}</p>
                    </div>
                    <hr />
                  </td>
                  <td>$ {e.price}</td>
                  <td>
                    <Quantity quantity={quantity} item={e.id} />
                  </td>
                  <td>${e.price * quantity}</td>
                  <td>BS.S {(e.price * rates).toLocaleString()}</td>
                  <td>
                    <Link
                      to="#delete"
                      onClick={(ev) => {
                        ev.preventDefault();
                        toast.info("eliminando");
                        axios
                          .put(
                            "/orders/edit",
                            {
                              edit: false,
                              id_order: parseInt(id),
                              id_item: e.id,
                            },
                            { headers: { Authorization: `Bearer ${token}` } }
                          )
                          .then((e) => {
                            toast.success("genial, dejame actualizar datos");
                            history.go(0);
                          });
                      }}
                      className="red btn-item"
                    >
                      X
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

function DetailOrders() {
  const [client, setClient] = useState({});
  const [order, setOrder] = useState({});
  const [items, setItems] = useState({});
  const history = useHistory();
  const { id } = useParams();
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    axios
      .get(`/orders/detail/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((e) => {
        setOrder(e.data.order);
        setItems({
          items: e.data.items,
          sumatory: e.data.sumatory,
          rate: e.data.rate,
        });
        setClient(e.data.client);
      });
  }, [id]);

  if (
    Object.keys(order).length !== 0 &&
    Object.keys(items).length !== 0 &&
    Object.keys(client).length !== 0
  ) {
    return (
      <>
        <Nav />
        <Bar />
        <Goback/>
        <DetailClient props={client} />
        <DetailOrder order={order} rate={items.rate ?? ""} />
        <DetailItemsOfCard items={items} />
      </>
    );
  } else {
    return <h1>...</h1>;
  }
}
export default withRouter(DetailOrders);
