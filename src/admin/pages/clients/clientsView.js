import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useHistory, useParams, withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import Bar from "../../componente/bar/bar";
import Goback from "../../componente/goback/goback";
import Nav from "../../componente/nav/nav";
import { ReactComponent as Iusuario } from "../../../media/icons/user-astronaut-solid.svg";
import "./clients.css";
import { Modal, ModalTransition, useModal } from "react-simple-hook-modal";

const ConfirmDelete = ({ props }) => {
  const { isModalOpen, openModal, closeModal } = useModal();
  const token = window.localStorage.getItem("token");
  const history = useHistory();

  return (
    <>
      <Link className="red" onClick={openModal}>
        eliminar
      </Link>
      <Modal isOpen={isModalOpen} transition={ModalTransition.BOTTOM_UP}>
        <div className="modal-body">
          <div className="modal-title">
            <h2>Eliminar Cuenta del Cliente</h2>
          </div>
          <div className="modal">
            <p>
              Hola {JSON.parse(window.localStorage.getItem("user")).first_name},
              estas apunto de
              <b className="text-red">
                eliminiar la cuenta de {props.first_name}
                {props.second_name ?? ""}
              </b>
              .
              <br />
              <br />
              Tenga en cuenta que al eliminar esta cuenta la información quedara
              en base de datos guardada, y podras restaurarlo nuevamente.
              <br />
              <br />
              este usuario no podra crear mas cuentas con el correo asociado a
              esa cuenta, y todo el historial de transaciones no sera visible
              por este medio.
              <br />
              <br />
              si usted desea borrar esta cuenta de forma irreversible, selecione
              el boton que dice
              <b className="text-red"> "ELIMINAR PERMANENTE"</b>
              <br />
              <br />
              Si ha llegado aqui por error, presione el boton Salir, para anular
              la operación.
            </p>
          </div>
          <br />
          <br />
          <br />
          <div className="modal-btn">
            <Link className="red" to="#exit" onClick={closeModal}>
              Salir
            </Link>
            <Link
              className="secundary"
              to="#deletePermanent"
              onClick={(e) => {
                toast.info("💥 solicitando Destrución de la cuenta");
                setTimeout((e) => {
                  toast.info("🦾 Ejecutando Eliminación");
                  closeModal(e);
                }, 3000);
                axios
                  .delete(`/clients/destroy/${props.id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                  })
                  .then((e) => {
                    toast.success("👍 se ha eliminado de manera permanente");
                    history.push("/clients");

                  });
              }}
            >
              Eliminar Permanente
            </Link>
            <Link
              className="primary"
              to="#delete"
              onClick={(e) => {
                toast.info("✌️ solicitando Eliminación de la cuenta");
                setTimeout(toast.info("🦾 Ejecutando Eliminación"), 3000);
                axios
                  .delete(`/clients/delete/${props.id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                  })
                  .then((e) => {
                    toast.success("👍 se ha eliminado");
                    closeModal(e);
                    history.push("/clients");
                  });
              }}
            >
              Eliminar
            </Link>
          </div>
        </div>
      </Modal>
    </>
  );
};

const ConfirmDisable = ({ props }) => {
  const { isModalOpen, openModal, closeModal } = useModal();
  const token = window.localStorage.getItem("token");

  return (
    <>
      <Link className="gray" to="#suspender" onClick={openModal}>
        {props.account_enabled ? "suspender" : "habilitar"}
      </Link>
      <Modal
        id="any-unique-identifier"
        isOpen={isModalOpen}
        transition={ModalTransition.BOTTOM_UP}
      >
        <div className="modal-body">
          <div className="modal-title">
            <h2>Eliminar Cuenta del Cliente</h2>
          </div>
          <div className="modal">
            <p>
              Hola {JSON.parse(window.localStorage.getItem("user")).first_name},
              estas apunto de{" "}
              <b className="text-red">
                {props.account_enabled ? "suspender" : "habilitar"} la cuenta de{" "}
                {props.first_name}
                {props.second_name ?? ""}
              </b>
              .
              <br />
              <br />
              Tenga en cuenta que al suspender esta cuenta la información
              quedara en base de datos guardada, y podras restaurarlo
              nuevamente.
              <br />
              <br />
              Si usted lo suspende este usuario no podra realizar compras dentro
              del sitio y tampoco podra crear mas cuentas con el correo asociado
              a esa cuenta, este usuario sera visible para el sistema.
              <br />
              <br />
              <br />
              Si ha llegado aqui por error, presione el boton Salir, para anular
              la operación.
            </p>
          </div>
          <br />
          <br />
          <br />
          <div className="modal-btn">
            <Link className="red" to="#a" onClick={closeModal}>
              Salir
            </Link>
            <Link
              className="primary"
              to="#a"
              onClick={(e) => {
                toast.info(
                  `✌️ solicitando ${
                    props.account_enabled ? "Suspensión" : "Habilitación"
                  }`
                );
                setTimeout((e) => {
                  toast.info("🦾 Ejecutando la operación");
                  closeModal(e);
                }, 3000);
                axios
                  .delete(`/clients/suspend/${props.id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                  })
                  .then((e) => {
                    toast.success(
                      `👍 se ha ${
                        props.account_enabled ? "suspendido" : "habilitado"
                      } con exito`
                    );
                    window.location = `/clients/${props.id}`;
                  });
              }}
            >
              {props.account_enabled ? "suspender" : "habilitar"}
            </Link>
          </div>
        </div>
      </Modal>
    </>
  );
};


function DataClient({ client }) {
  const { id } = useParams();

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
                  <tr>
                    <td className="text-primary">Conexión:</td>
                    <td className="text-secundary">
                      {client.account_type ? "ONLINE" : "OFFLINE"}
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
                <Link className="primary text-white" to="/orders/order/user/1">
                  Historial de Transapciones
                </Link>
              </div>
            </center>
          </div>
        </div>
        <hr />
        <div className="base-client-bottom">
          <div className="client-buttons">
            <ConfirmDelete props={client} />
            <ConfirmDisable props={client} />
            <Link className="secundary" to="/coupons/user/1">
              descuento
            </Link>
            <Link to={`/clients/edit/${id}`}>editar</Link>
          </div>
          <hr />

          <div className="client-tablet">
            <center>
              <table>
                <thead>
                  <tr>
                    <th className="text-primary">Dispositivo</th>
                    <th className="text-primary">IP</th>
                    <th className="text-primary">Ultima Conexión</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>android</td>
                    <td>193.200.10.2</td>
                    <td>2019-02-12</td>
                  </tr>
                </tbody>
              </table>
            </center>
          </div>
        </div>
      </div>
    </>
  );
}

function ClientsView() {
  const token = window.localStorage.getItem("token");
  const history = useHistory();
  const [dclient, setDclient] = useState({});
  const { id } = useParams();
  useEffect(() => {
    toast.info("🧐 Buscando datos", { autoClose: 2500 });
    axios
      .get(`/clients/find/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((e) => {
        setDclient(e.data);
        if (Object.keys(e.data).length === 0) {
          document.getElementById("info-page").innerText =
            "Este Cliente no existe";
          toast.error("🤷‍♂️ Cliente no existe");
        } else {
          toast.success("😎 Cliente encontrado");
        }
      })
      .catch((e) => {
        if (e.response && e.response.status === 400) {
          toast.error(
            `🤦‍♂️ aff, ha ocurrido un error al pedir los datos del cliente`,
            {
              autoClose: false,
              closeOnClick: true,
              draggable: true,
            }
          );
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
  }, [id, token]);
  return (
    <>
      <Nav />
      <Bar />
      <Goback history={history} />
      {Object.keys(dclient).length !== 0 ? (
        <DataClient client={dclient} />
      ) : (
        <h1 id="info-page">Cargando datos</h1>
      )}
    </>
  );
}
export default withRouter(ClientsView);
